import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface Line {
  slug: string;
  qty: number;
}

// Bewust geen import van src/lib/products.ts: Vercel bundelt Node-functies in
// api/ niet betrouwbaar mee met relatieve imports van buiten die map — dat gaf
// in productie een ERR_MODULE_NOT_FOUND crash op elke checkout-poging. Dit is
// de bron van waarheid voor het bedrag dat echt in rekening wordt gebracht,
// dus hou 'm in sync met PRODUCTS in src/lib/products.ts.
const PRODUCTS = [
  { slug: "folea", name: "Folea", role: "Voedende hair butter · 200 g", price: 3600 },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Alleen POST" });
  }

  try {
    const { lines } = req.body as { lines: Line[] };
    if (!Array.isArray(lines) || !lines.length) {
      return res.status(400).json({ error: "Lege winkeltas" });
    }

    // Prijzen komen van de server, nooit van de client. Anders kan iemand
    // in de devtools zijn eigen bedrag invullen.
    const items = lines.map((line) => {
      const product = PRODUCTS.find((p) => p.slug === line.slug);
      if (!product) throw new Error(`Onbekend product: ${line.slug}`);
      const qty = Math.min(Math.max(1, Math.floor(line.qty)), 20);

      return {
        quantity: qty,
        price_data: {
          currency: "eur",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.role,
          },
        },
      } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const subtotal = items.reduce(
      (sum, i) => sum + i.price_data.unit_amount * i.quantity,
      0,
    );

    const origin =
      req.headers.origin ?? process.env.VITE_SITE_URL ?? "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      locale: "nl",
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["NL", "BE", "DE"] },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: subtotal >= 4500 ? "Gratis verzending" : "Verzending",
            type: "fixed_amount",
            fixed_amount: { amount: subtotal >= 4500 ? 0 : 495, currency: "eur" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
      ],
      success_url: `${origin}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/product/${PRODUCTS[0].slug}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return res.status(500).json({ error: "Kon de checkout niet starten" });
  }
}

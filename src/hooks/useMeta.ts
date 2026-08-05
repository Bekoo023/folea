import { useEffect } from "react";

interface MetaOptions {
  title: string;
  description?: string;
  image?: string;
  /** bv. de bedankt-pagina na een bestelling: nuttig voor de bezoeker, niet om te indexeren */
  noindex?: boolean;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Zet per pagina een eigen title/description/OG-tags — een SPA deelt anders
 * voor elke route dezelfde tags uit index.html. */
export function useMeta({ title, description, image, noindex }: MetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | FOLEA`;
    const prevTitle = document.title;
    document.title = fullTitle;
    setMeta('meta[name="robots"]', "content", noindex ? "noindex, nofollow" : "index, follow");
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    if (image) {
      setMeta('meta[property="og:image"]', "content", image);
      setMeta('meta[name="twitter:image"]', "content", image);
    }
    setMeta('meta[property="og:url"]', "content", window.location.href);
    setMeta('link[rel="canonical"]', "href", window.location.href);

    return () => {
      document.title = prevTitle;
      setMeta('meta[name="robots"]', "content", "index, follow");
    };
  }, [title, description, image, noindex]);
}

/** centen -> "€ 24,00" */
export const euro = (cents: number) =>
  "€ " + (cents / 100).toFixed(2).replace(".", ",");

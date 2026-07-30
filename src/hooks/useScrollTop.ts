import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Bij elke routewissel terug naar boven. */
export function useScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
}

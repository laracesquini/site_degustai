import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Vai para o topo
  }, [pathname]);

  return null; // Esse componente não renderiza nada visível
}

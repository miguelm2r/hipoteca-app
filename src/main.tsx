import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MortgageProvider } from "./provider/MortgageProvider.tsx";

// Usamos el provider para acceder a nuestro state global

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MortgageProvider>
      <App />
    </MortgageProvider>
  </StrictMode>
);

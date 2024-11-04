import { useContext } from "react";
import { MortgageContext } from "../context/MortgageContext";

export const useMortgage = () => {
  const context = useContext(MortgageContext);
  if (!context) {
    throw new Error("useMortgage must be used within a MortgageProvider");
  }
  return context;
};

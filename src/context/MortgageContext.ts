import { createContext, Dispatch } from "react";
import { MortgageActions, MortgageState } from "../reducers/MortgageReducer";

// Definimos los types del context
type MortgageContextProps = {
  state: MortgageState;
  dispatch: Dispatch<MortgageActions>;
};

// Creamos y exportamos el context
export const MortgageContext = createContext<MortgageContextProps>(null!);

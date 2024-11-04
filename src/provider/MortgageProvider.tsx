import { useReducer, ReactNode } from "react";
import { mortgageReducer, initialState } from "../reducers/MortgageReducer";
import { MortgageContext } from "../context/MortgageContext";

// Definimos el type para los props del provider
type MortgageProviderProps = {
  children: ReactNode;
};

// Creamos el provider
export const MortgageProvider = ({ children }: MortgageProviderProps) => {
  // Obtenemos el state y el dispatch a traves del reducer
  const [state, dispatch] = useReducer(mortgageReducer, initialState);

  // Devolvemos el context para tenerlo en nuestro provider
  return (
    <MortgageContext.Provider value={{ state, dispatch }}>
      {children}
    </MortgageContext.Provider>
  );
};

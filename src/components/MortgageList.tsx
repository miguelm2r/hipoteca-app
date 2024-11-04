import { useMemo } from "react";
import { useMortgage } from "../hooks/useMortgage";
import HouseDetail from "./HouseDetail";

export default function MortgageList() {
  // Consultamos el state
  const { state } = useMortgage();

  // Comprobamos si tenemos datos en el array de houses
  const isEmpty = useMemo(() => state.houses.length === 0, [state.houses]);
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold text-center">
          No hay casas añadidas
        </p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold text-center">
            Listado de casas:
          </p>
          {state.houses.map((house) => (
            <HouseDetail key={house.id} house={house} />
          ))}
        </>
      )}
    </div>
  );
}

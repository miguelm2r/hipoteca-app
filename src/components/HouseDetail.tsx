import { House } from "../types";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useMortgage } from "../hooks/useMortgage";
import { finalValue } from "../helpers/index";
import {
  formatCurrency,
  monthlyPayment,
  totalInterest,
  totalPayment,
} from "../helpers";

// Importamos el type de house
type HouseDetailProps = {
  house: House;
};

export default function HouseDetail({ house }: HouseDetailProps) {
  // Nos traemos el dispatch
  const { dispatch } = useMortgage();

  //Esta sera la accion de actualizar
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "get-house-by-id", payload: { id: house.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  // Esta sera la accion de eliminar
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "delete-house", payload: { id: house.id } })
        }
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-green-600 flex gap-5 items-center">
          <div className="flex-1 space-y-2 text-black">
            <p className="text-xl font-bold uppercase ">{house.houseName}</p>
            <p className="text-sm font-bold uppercase ">
              Coste:{" "}
              <span className="text-gray-800">
                {formatCurrency(house.cost)}
              </span>
            </p>
            <p className="text-sm font-bold uppercase ">
              Años de Hipoteca:{" "}
              <span className="text-gray-800">{house.mortageYear} años</span>
            </p>
            <p className="text-sm font-bold uppercase ">
              Tasa: <span className="text-gray-800">{house.mortageRate} %</span>
            </p>
          </div>

          <div className="flex-1 space-y-2 text-black">
            <p className="text-sm font-bold uppercase ">
              Pago Mensual:{" "}
              <span className="text-gray-800">
                {formatCurrency(monthlyPayment(house))}
              </span>
            </p>
            <p className="text-sm font-bold uppercase ">
              Monto Total a pagar:{" "}
              <span className="text-gray-800">
                {formatCurrency(totalPayment(house))}
              </span>
            </p>
            <p className="text-sm font-bold uppercase ">
              Monto intereses:{" "}
              <span className="text-gray-800">
                {formatCurrency(totalInterest(house))}
              </span>
            </p>
            <p className="text-sm font-bold uppercase ">
              Valor al final del prestamo:{" "}
              <span className="text-gray-800">
                {formatCurrency(finalValue(house))}
              </span>
            </p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

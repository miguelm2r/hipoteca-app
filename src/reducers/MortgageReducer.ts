import { v4 as uuidv4 } from "uuid";
import { DraftHouse, House } from "../types";

// acciones y payload del reducer
export type MortgageActions =
  | { type: "add-house"; payload: { house: DraftHouse } }
  | { type: "get-house-by-id"; payload: { id: House["id"] } }
  | { type: "update-house"; payload: { house: House } }
  | { type: "delete-house"; payload: { id: House["id"] } }
  | { type: "reset-app" }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "show-modal-reset" }
  | { type: "close-modal-reset" };

// Type del reducer
export type MortgageState = {
  houses: House[];
  modal: boolean;
  modalReset: boolean;
  editingId: House["id"];
};

// Recuperar de localStorage
const localStorageHouses = (): House[] => {
  const localStorageHouses = localStorage.getItem("houses");
  return localStorageHouses ? JSON.parse(localStorageHouses) : [];
};

// Initial state del reducer
export const initialState: MortgageState = {
  houses: localStorageHouses(),
  modal: false,
  modalReset: false,
  editingId: "",
};

// Añadimos un id a la casa
const createHouse = (draftHouse: DraftHouse): House => {
  return {
    ...draftHouse,
    id: uuidv4(),
  };
};

// Creamos el reducer
export const mortgageReducer = (
  state: MortgageState = initialState,
  action: MortgageActions
) => {
  // Añadimos la casa con un id a nuestro array de casas
  if (action.type === "add-house") {
    const house = createHouse(action.payload.house);
    return {
      ...state,
      houses: [...state.houses, house],
      modal: false,
    };
  }

  // Actualizar la casa mediante el id
  if (action.type === "get-house-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  // Actualizar la casa
  if (action.type === "update-house") {
    return {
      ...state,
      houses: state.houses.map((house) =>
        house.id === action.payload.house.id ? action.payload.house : house
      ),
      modal: false,
      editingId: "",
    };
  }

  // Eliminar la casa
  if (action.type === "delete-house") {
    return {
      ...state,
      houses: state.houses.filter((house) => house.id !== action.payload.id),
    };
  }

  // Mostrar el modal del formulario
  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  // Cerrar el modal del formulario
  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
    };
  }

  // Mostrar el modal de reiniciar app
  if (action.type === "show-modal-reset") {
    return {
      ...state,
      modalReset: true,
    };
  }

  // Cerrar el modal de reiniciar
  if (action.type === "close-modal-reset") {
    return {
      ...state,
      modalReset: false,
    };
  }

  // Reseteamos la aplicacion
  if (action.type === "reset-app") {
    return {
      ...state,
      houses: [],
      modalReset: false,
    };
  }

  // Devolvemos el state
  return state;
};

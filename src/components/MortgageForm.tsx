import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftHouse } from "../types";
import { useMortgage } from "../hooks/useMortgage";
import ErrorMessage from "./ErrorMessage";

export default function MortgageForm() {
  // Creamos el useState de house que usara el type de DraftHouse
  const [house, setHouse] = useState<DraftHouse>({
    houseName: "",
    cost: 0,
    mortageYear: 0,
    mortageRate: 0,
  });

  // Creamos el state de error
  const [error, setError] = useState("");

  // Importamos el state y dispatch del reducer
  const { state, dispatch } = useMortgage();

  // Decimos cuanto es el numero maximo de años de hipoteca y creamos un array con los años
  const maxYears: number = 40;
  const years = Array.from({ length: maxYears }, (_, i) => i + 1);

  //Rellenamos el formulario automaticamente si vamos a editarlo
  useEffect(() => {
    if (state.editingId) {
      const editingHouse = state.houses.filter(
        (currentHouse) => currentHouse.id === state.editingId
      )[0];
      setHouse(editingHouse);
    }
  }, [state.editingId, state.houses]);

  // Creamos el handleChange que se llamara cuando cambien los valores del formulario
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    //console.log(e.target.name);
    //console.log(e.target.value);
    // Extraemos el nombre y valor para saber cual input esta cambiando
    const { name, value } = e.target;
    // Comprobamos si el valor no es un numero para transformarlo a numero si lo es
    const isStringField = ["houseName"].includes(name);
    setHouse({
      ...house,
      [name]: isStringField ? value : +value,
    });
  };

  // Creamos el submit que enviara el formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(house);

    // Validar que los campos contengan algo
    if (Object.values(house).includes("") || Object.values(house).includes(0)) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validar que los campos sean positivos
    if (house.cost < 0 || house.mortageRate < 0) {
      setError("Los campos numericos deben ser mayores a 0");
      return;
    }

    // Guardamos o actualizamos los datos usando el reducer
    if (state.editingId) {
      dispatch({
        type: "update-house",
        payload: { house: { id: state.editingId, ...house } },
      });
    } else {
      dispatch({ type: "add-house", payload: { house } });
    }

    // Reiniciamos el state local
    setHouse({
      houseName: "",
      cost: 0,
      mortageYear: 0,
      mortageRate: 0,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-3xl font-black text-white border-b-4 border-green-800">
        {state.editingId ? "Editar Casa" : "Nueva Casa"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col space-y-3">
        <label
          htmlFor="houseName"
          className="text-2xl font-bold text-center text-white"
        >
          Nombre de la Casa
        </label>
        <input
          id="houseName"
          type="text"
          className="w-full bg-white border border-gray-300 rounded-lg p-2"
          placeholder="Escribe el nombre de la casa"
          name="houseName"
          value={house.houseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label
          htmlFor="cost"
          className="text-2xl font-bold text-center text-white"
        >
          Coste de la Casa
        </label>
        <input
          id="cost"
          type="number"
          className="w-full bg-white border border-gray-300 rounded-lg p-2"
          placeholder="Inserta el precio de la casa"
          name="cost"
          value={house.cost}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label
          htmlFor="mortageYear"
          className="text-2xl font-bold text-center text-white"
        >
          Años de hipoteca
        </label>
        <select
          id="mortageYear"
          className="w-full border bg-white border-gray-300 rounded-lg p-2 "
          name="mortageYear"
          value={house.mortageYear}
          onChange={handleChange}
        >
          <option value="">-- Seleccione los años de hipoteca --</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-3">
        <label
          htmlFor="mortageRate"
          className="text-2xl font-bold text-center text-white"
        >
          Tasa hipotecaria
        </label>
        <input
          id="mortageRate"
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Define el precio de la casa"
          name="mortageRate"
          value={house.mortageRate}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Calcular"
        className="bg-green-800 hover:bg-green-900 cursor-pointer w-full py-3 font-bold text-white shadow-lg text-xl rounded-lg uppercase"
      />
    </form>
  );
}

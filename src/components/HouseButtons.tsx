import { useMortgage } from "../hooks/useMortgage";

export default function HouseButtons() {
  const { dispatch } = useMortgage();

  return (
    <div className="flex flex-row justify-between items-center gap-20 ">
      <button
        type="button"
        className="bg-green-800 text-xl hover:bg-green-900 w-full text-white uppercase font-bold rounded-lg py-3 shadow-lg"
        onClick={() => dispatch({ type: "show-modal" })}
      >
        Añadir Casa
      </button>

      <button
        type="button"
        className="bg-red-600 text-xl hover:bg-red-700 w-full text-white uppercase font-bold rounded-lg py-3 shadow-lg"
        onClick={() => dispatch({ type: "show-modal-reset" })}
      >
        Reiniciar App
      </button>
    </div>
  );
}

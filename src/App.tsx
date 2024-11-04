import { useEffect } from "react";
import { useMortgage } from "./hooks/useMortgage";
import MortgageList from "./components/MortgageList";
import MortgageModal from "./components/MortgageModal";
import HouseButtons from "./components/HouseButtons";
import ResetModal from "./components/ResetModal";

function App() {
  // Guardamos en localStorage cada vez que cambie el state global
  const { state } = useMortgage();
  useEffect(() => {
    localStorage.setItem("houses", JSON.stringify(state.houses));
  }, [state]);

  return (
    <>
      <header className="bg-green-800 py-8 max-h-72">
        <p className="uppercase font-bold text-center text-4xl text-white">
          Calculo hipoteca
        </p>
      </header>

      <main className="max-w-3xl mx-auto py-10">
        <MortgageModal />
        <ResetModal />
        <HouseButtons />
        <MortgageList />
      </main>
    </>
  );
}

export default App;

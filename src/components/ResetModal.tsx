import { Fragment } from "react";
import { useMortgage } from "../hooks/useMortgage";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

export default function ResetModal() {
  // Nos traemos el state y el dispatch para abrir y cerrar el modal
  const { state, dispatch } = useMortgage();
  return (
    <>
      <Transition appear show={state.modalReset} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch({ type: "close-modal-reset" })}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-green-600 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="space-y-10">
                    <p className="font-bold text-white text-2xl text-center">
                      ¿Deseas eliminar todos los datos?
                    </p>
                    <div className="grid grid-cols-2 gap-20">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white text-xl uppercase font-bold rounded-lg py-3 shadow-lg"
                        onClick={() => dispatch({ type: "reset-app" })}
                      >
                        Si
                      </button>
                      <button
                        className="bg-green-800 hover:bg-green-900 text-white text-xl uppercase font-bold rounded-lg py-3 shadow-lg"
                        onClick={() => dispatch({ type: "close-modal-reset" })}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

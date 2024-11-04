import { Fragment } from "react";
import { useMortgage } from "../hooks/useMortgage";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import MortgageForm from "./MortgageForm";

export default function MortgageModal() {
  // Nos traemos el state y el dispatch para abrir y cerrar el modal
  const { state, dispatch } = useMortgage();
  return (
    <>
      <Transition appear show={state.modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch({ type: "close-modal" })}
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
                  <MortgageForm />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

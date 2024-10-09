import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import AlgoSearch from "../AlgoSearch";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: ModalComponentProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 w-screen z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-[25rem] w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {/* <AlgoSearch onCloseModal={onClose} isOpen={isOpen} /> */}
            <div>確認用</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

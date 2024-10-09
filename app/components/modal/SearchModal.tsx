import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
// import AlgoSearch from "../AlgoSearch";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// AlgoSearch を動的インポートし、ssr を無効化
const AlgoSearch = dynamic(() => import("../AlgoSearch"), { ssr: false });

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchModal({
  isOpen,
  onClose,
  inputRef,
}: ModalComponentProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed top-0 w-screen z-10">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform rounded-lg text-left shadow-xl transition-all  data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-lg"
          >
            <AlgoSearch
              onCloseModal={onClose}
              isOpen={isOpen}
              inputRef={inputRef}
            />
            {/* <div>確認用</div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

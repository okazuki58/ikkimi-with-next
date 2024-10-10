"use client";

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BlackButton } from "../BlackButton";
import { WhiteButton } from "../WhiteButton";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-6"
          >
            <button
              onClick={() => onClose()}
              className="absolute top-6 right-6 text-gray-400"
            >
              <XMarkIcon className="size-5" />
            </button>
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-2xl font-bold">Title</DialogTitle>
              <Description>
                This will permanently deactivate your account
              </Description>
              <p>
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed.
              </p>
              <div className="flex gap-4 mt-4">
                <WhiteButton onClick={() => onClose()}>Cancel</WhiteButton>
                <BlackButton onClick={() => onClose()}>Deactivate</BlackButton>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import GoogleButton from "./googleButton";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ModalComponentProps) {
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
            className="relative transform overflow-hidden rounded-lg bg-white px-4 py-8 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-lg sm:p-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="relative flex flex-col items-center gap-10">
              <button className="absolute top-0 right-0 text-gray-400">
                <XMarkIcon className="size-5" />
              </button>
              <div className="flex items-center gap-2">
                <img src="/frame-1.svg" alt="" className="size-9" />
                <div className="font-unbounded text-4xl font-semibold text-gray-900 tracking-wide">
                  Ikkimi
                </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="text-sm text-gray-800 sm:px-4 leading-6 font-medium">
                  Ikkimiは漫画共有プラットフォームです。イッキ見した漫画をブックマークして、みんなで共有しましょう。
                  <span className="inline-flex text-indigo-600 items-center gap-1 border-b border-transparent md:hover:border-indigo-600 cursor-pointer">
                    Ikkimiの使い方を見る
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-[320px]">
                    <GoogleButton />
                  </div>
                  <button className="text-sm text-gray-400 rounded-md px-4 py-2 md:hover:bg-gray-100 md:hover:text-gray-700 transition">
                    Googleアカウントをお持ちでない方
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import GoogleButton from "../GoogleButton";

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
            className="relative transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-[25rem] w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <button
              onClick={() => onClose()}
              className="absolute top-6 right-6 text-gray-400"
            >
              <XMarkIcon className="size-5" />
            </button>
            <div className="relative flex flex-col items-center gap-6 pb-2">
              <div className="flex items-center gap-2">
                {/* <img src="/frame-1.svg" alt="" className="size-9" />
                <div className="font-unbounded text-4xl font-semibold text-gray-900 tracking-wide">
                  Ikkimi
                </div> */}
                <h1 className="font-medium text-xl py-8 mt-1">
                  Log in or Sign up
                </h1>
              </div>
              <div className="flex flex-col items-center gap-6 w-full">
                {/* <div className="text-sm text-gray-800 leading-6 font-medium w-fullsm:px-4 max-w-[360px]">
                  Ikkimiは漫画推薦ネットワークです。好きな漫画をブックマークしてみんなに共有しましょう。
                  <span className="inline-flex text-indigo-600 items-center gap-1 border-b border-transparent md:hover:underline cursor-pointer">
                    Ikkimiの使い方を見る
                    <ArrowUpRightIcon className="size-3" />
                  </span>
                </div> */}

                <div className="flex flex-col items-center justify-between gap-4 w-full">
                  <GoogleButton />
                  {/* <Link href="/signup">
                    <button className="text-xs text-gray-500 rounded-md px-4 py-2 md:hover:bg-gray-100 md:hover:text-gray-700 transition">
                      Googleアカウントをお持ちでない方
                    </button>
                  </Link> */}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

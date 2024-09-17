"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Manga } from "../lib/definitions";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface MangaDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  manga: Manga | null;
  isAnimating: boolean;
}

export default function MangaDialog({
  isOpen,
  setIsOpen,
  manga,
  isAnimating,
}: MangaDialogProps) {
  if (!manga) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center px-4">
          <DialogPanel
            transition
            className={`flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl
            ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    alt=""
                    src={manga.cover_url}
                    className="object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-3xl text-gray-900 sm:pr-12">
                    {manga.title}
                  </h2>
                  <ul className="flex gap-2 my-4">
                    <li className="px-2 py-1 text-xs border rounded-lg">
                      サスペンス
                    </li>
                    <li className="px-2 py-1 text-xs border rounded-lg">
                      推理
                    </li>
                    <li className="px-2 py-1 text-xs border rounded-lg">
                      マンガ大賞
                    </li>
                  </ul>
                  <div className="flex">
                    <span>98+ users</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">{manga.description}</p>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to bag
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

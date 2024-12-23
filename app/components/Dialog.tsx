"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Manga } from "../lib/definitions";
import { ShieldExclamationIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import { useRouter } from "next/navigation";
import { ImageSkeleton } from "./Skeletons";
import { getImageUrl } from "../lib/data";
import BookmarkedUsersModal from "./modal/BookmarkedUsersModal";

interface MangaDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  manga: Manga;
}

export default function MangaDialog({
  isOpen,
  setIsOpen,
  manga,
}: MangaDialogProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [localManga, setLocalManga] = useState<Manga>(manga);
  const [isBookmarkedUsersModalOpen, setIsBookmarkedUsersModalOpen] =
    useState(false);

  useEffect(() => {
    setLocalManga(manga);
  }, [manga]);

  const router = useRouter();

  function handleNav(params: string) {
    if (params) {
      router.push(`/search?query=${encodeURIComponent(params)}`);
    }
  }

  if (!localManga) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex flex-col min-h-full items-stretch justify-center text-center md:items-center px-4">
          <DialogPanel
            transition
            className={`flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in mt-8 sm:mb-8 mb-20 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl`}
          >
            <div className="relative flex w-full items-center rounded-lg overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-4 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                  <div className="overflow-hidden rounded-lg bg-gray-100 border border-slate-100 relative aspect-[549/780]">
                    {!isImageLoaded && <ImageSkeleton />}
                    <Image
                      src={getImageUrl(
                        localManga.folder_group,
                        localManga.image_id
                      )}
                      unoptimized
                      alt={localManga.title}
                      className={`object-cover object-center transition-opacity duration-500 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      fill
                      onLoadingComplete={() => setIsImageLoaded(true)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {localManga.title}
                  </h2>
                  <ul className="flex flex-wrap gap-2 my-4">
                    <li
                      className="px-2 py-1 text-xs border rounded-md cursor-pointer hover:bg-gray-50"
                      onClick={() => handleNav(localManga.authors[0])}
                    >
                      {localManga.authors[0]}
                    </li>
                    {localManga.genres.map((genre) => (
                      <li
                        key={genre}
                        className="px-2 py-1 text-xs border rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={() => handleNav(genre)}
                      >
                        {genre}
                      </li>
                    ))}
                    <li
                      className="px-2 py-1 text-xs border rounded-md cursor-pointer hover:bg-gray-50"
                      onClick={() => handleNav(localManga.publisher)}
                    >
                      {localManga.publisher}
                    </li>
                  </ul>
                  <div className="flex items-center justify-between w-full">
                    <BookmarkButton
                      mangaId={localManga.id}
                      bookmark={localManga.bookmark}
                    />
                    <button
                      className="text-xs text-gray-700 md:hover:text-indigo-700 md:hover:underline cursor-pointer"
                      onClick={() => setIsBookmarkedUsersModalOpen(true)}
                    >
                      ブックマーク中のユーザー
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      {localManga.description}
                    </p>
                  </div>
                  {manga.amazon_url ? (
                    <Link
                      href={manga.amazon_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <button
                        type="button"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                      >
                        Amazonで読む
                      </button>
                    </Link>
                  ) : (
                    <div className="text-sm px-8 py-3 text-gray-500 mt-6 flex w-full items-center justify-center rounded-md border border-transparent">
                      この作品のAmazonリンクは追加予定です
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
      <BookmarkedUsersModal
        isOpen={isBookmarkedUsersModalOpen}
        onClose={() => setIsBookmarkedUsersModalOpen(false)}
        mangaId={localManga.id}
      />
    </Dialog>
  );
}

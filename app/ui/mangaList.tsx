"use client";

import Image from "next/image";
import { Manga } from "../lib/definitions";
import { useState } from "react";
import MangaDialog from "./dialog";
import { MangaListSkeleton } from "./skeletons";
import "react-toastify/dist/ReactToastify.css";
import BookmarkButton from "./bookmarkButton";

export default function MangaList({
  mangas,
  isLoading,
}: {
  mangas: Manga[];
  isLoading: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
    setIsAnimating(true);
  };

  if (isLoading) {
    return <MangaListSkeleton />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-5">
        {mangas.map((manga) => (
          <div key={`${manga.id}`} className="flex flex-col">
            <div
              className="flex flex-col gap-1.5 group pb-1 hover:cursor-pointer"
              onClick={() => openDialog(manga)}
            >
              <div className="relative rounded-md overflow-hidden">
                <Image
                  src={manga.cover_url}
                  alt={manga.title}
                  width={549}
                  height={780}
                  style={{ objectFit: "cover" }}
                  className="transition-transform transform md:group-hover:scale-105"
                />
              </div>
              <h3 className="md:text-sm line-clamp-1 text-slate-900 dark:text-white md:group-hover:text-indigo-600 dark:md:group-hover:text-[#FC4747]">
                {manga.title}
              </h3>
            </div>

            {/* Bookmark Button */}
            <BookmarkButton mangaId={manga.id} likes={manga.likes} />
          </div>
        ))}
      </div>

      <MangaDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        manga={selectedManga}
        isAnimating={isAnimating}
      />
    </>
  );
}

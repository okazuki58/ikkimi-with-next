"use client";

import Image from "next/image";
import { Manga } from "../lib/definitions";
import { useState } from "react";
import MangaDialog from "./dialog";
import { MangaListSkeleton } from "./skeletons";
import BookmarkButton from "./bookmarkButton";
import { getImageUrl } from "../lib/data";
import { useBookmark } from "../context/BookmarkContext";

type MangaListProps = {
  mangas: Manga[];
  isLoading: boolean;
  limit?: number; // 表示数を指定するプロップスを追加、任意のため"?"を付ける
};

export default function MangaList({
  mangas,
  isLoading,
  limit,
}: MangaListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga>();
  const [isAnimating, setIsAnimating] = useState(false);
  const displayLimit = limit ?? 12;

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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-2 sm:gap-x-3 gap-y-5">
        {mangas?.slice(0, displayLimit).map((manga) => (
          <div key={`${manga.id}`} className="flex flex-col">
            <div
              className="flex flex-col gap-1 sm:gap-1.5 group pb-1 hover:cursor-pointer"
              onClick={() => openDialog(manga)}
            >
              <div className="relative rounded-md aspect-[549/780] overflow-hidden border border-slate-100">
                <Image
                  src={getImageUrl(manga.folder_group, manga.image_id)}
                  alt={manga.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform transform md:group-hover:scale-105"
                />
              </div>
              <h3 className="md:text-sm line-clamp-1 text-slate-900 dark:text-white md:group-hover:text-indigo-600 dark:md:group-hover:text-[#FC4747]">
                {manga.title}
              </h3>
            </div>

            {/* Bookmark Button */}
            <BookmarkButton mangaId={manga.id} bookmark={manga.bookmark} />
          </div>
        ))}
      </div>

      <MangaDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        manga={selectedManga!}
        isAnimating={isAnimating}
      />
    </>
  );
}

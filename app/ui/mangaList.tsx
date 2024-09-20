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
  userLikes,
  sectionTitle,
  isLoading,
}: {
  mangas: Manga[];
  userLikes: number[];
  sectionTitle: string;
  isLoading: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(true), 500);
  };

  if (isLoading) {
    return <MangaListSkeleton />;
  }

  return (
    <div className="py-10">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-indigo-600 dark:text-[#FC4747] pl-1 text-sm font-semibold font-inter mb-2 leading-6">
            Monthly Ranking
          </span>
          <h1 className="inline-block tracking-light text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200">
            {sectionTitle}
          </h1>
        </div>
        <a href="#" className="text-sm leading-10 dark:text-white">
          すべて見る
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-5 py-4">
        {mangas.map((manga) => (
          <div key={`${manga.id}-${sectionTitle}`} className="flex flex-col">
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
        userLikes={userLikes}
      />
    </div>
  );
}

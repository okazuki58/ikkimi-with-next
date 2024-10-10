"use client";

import Image from "next/image";
import { Manga } from "../../lib/definitions";
import { useState } from "react";
import MangaDialog from "../Dialog";
import { ImageSkeleton, MangaListSkeleton } from "../Skeletons";
import BookmarkButton from "../BookmarkButton";
import { getImageUrl } from "../../lib/data";

type MangaListProps = {
  mangas: Manga[];
  isLoading: boolean;
  limit?: number;
};

export default function MangaListForRanking({
  mangas,
  isLoading,
  limit,
}: MangaListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga>();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const displayLimit = limit ?? 12;

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
  };

  // const filteredMangas = mangas.filter(
  //   (manga) =>
  //     selectedCategory === "総合" || manga.category === selectedCategory
  // );

  if (isLoading) {
    return <MangaListSkeleton />;
  }

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-2 sm:gap-x-3 gap-y-5">
        {mangas?.slice(0, displayLimit).map((manga, index) => (
          <div key={`${manga.id}`} className="flex flex-col">
            <div
              className="flex flex-col group pb-1 hover:cursor-pointer"
              onClick={() => openDialog(manga)}
            >
              <div className="relative rounded-md aspect-[549/780] overflow-hidden border border-slate-100">
                {!isImageLoaded && <ImageSkeleton />}
                <Image
                  src={getImageUrl(manga.folder_group, manga.image_id)}
                  alt={manga.title}
                  unoptimized
                  fill
                  className={`transform md:group-hover:scale-105 transition-opacity duration-500 md:transition-transform md:duration-300 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ objectFit: "cover" }}
                  onLoadingComplete={() => setIsImageLoaded(true)}
                />
                <div className="absolute bottom-0 left-0 text-white text-sm font-semibold p-4 m-1 size-5 bg-gray-900/50 flex items-center justify-center rounded-md">
                  <span>{index + 1}</span>
                </div>
              </div>

              <div className="flex gap-2 items-center mt-1 sm:mt-1.5">
                {/* <ArrowUpIcon className="w-3 h-3 stroke-2 text-red-500" /> */}
                <h3 className="text-sm line-clamp-1 text-slate-900 dark:text-white md:group-hover:text-indigo-600">
                  {manga.title}
                </h3>
              </div>
              {/* 追加: リリース日と巻数を表示 */}
              <div className="flex gap-2">
                {manga.release_date && (
                  <p className="text-xs text-gray-600">{manga.release_date}</p>
                )}
                {manga.volume && (
                  <p className="text-xs text-gray-600">{manga.volume}巻</p>
                )}
              </div>
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
      />
    </>
  );
}

import Image from "next/image";
import { Manga } from "../lib/definitions";
import { useState } from "react";
import MangaDialog from "./dialog";
import { MangaListSkeleton } from "./skeletons";
import BookmarkButton from "./bookmarkButton";
import { useBookmark } from "../context/BookmarkContext";
import { getImageUrl } from "../lib/data";

interface ProfileMangaListProps {
  mangas: Manga[];
  isLoading: boolean;
}

export default function ProfileMangaList({
  mangas,
  isLoading,
}: ProfileMangaListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { bookmarkedMangas } = useBookmark(); // グローバルコンテキストから取得

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
        {mangas
          .filter((manga) => bookmarkedMangas.includes(manga.id)) // グローバルコンテキストのブックマークを使用
          .map((manga) => (
            <div key={`${manga.id}`} className="flex flex-col">
              <div
                className="flex flex-col gap-1.5 group pb-1 hover:cursor-pointer"
                onClick={() => openDialog(manga)}
              >
                <div className="relative rounded-md overflow-hidden">
                  <Image
                    src={getImageUrl(manga.image_id)}
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
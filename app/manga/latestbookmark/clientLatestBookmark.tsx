"use client";

import React, { useEffect, useState } from "react";
import { Manga } from "@/app/lib/definitions";
import { ImageSkeleton, MangaListSkeleton } from "@/app/components/Skeletons";
import { supabase } from "@/utils/supabaseClient";
import MangaDialog from "@/app/components/Dialog";
import Image from "next/image";
import { getImageUrl } from "@/app/lib/data";

interface MangaData {
  username: string;
  name: string;
  bookmark_date: string;
  avatar_url: string;
  manga: Manga;
}

const LatestBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<MangaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.rpc(
        "fetch_latest_bookmarked_manga_for_all_users"
      );

      if (error) {
        console.error("データの取得に失敗しました:", error);
      } else {
        setBookmarks(data);
      }
      setIsLoading(false);
    };

    fetchBookmarks();
  }, []);

  const formatBookmarkDate = (bookmarkDate: string) => {
    const now = new Date();
    const bookmarkTime = new Date(bookmarkDate);
    const diffInSeconds = Math.floor(
      (now.getTime() - bookmarkTime.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds}秒前`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}分前`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}時間前`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}日前`;
    }
  };

  if (isLoading) {
    return <MangaListSkeleton />;
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-2 sm:gap-x-3 gap-y-5">
        {bookmarks.map((bookmark, index) => (
          <div
            className="flex flex-col "
            onClick={() => openDialog(bookmark.manga)}
          >
            <div className="group pb-1 hover:cursor-pointer">
              <div className="relative rounded-md aspect-[549/780] overflow-hidden border border-slate-100">
                {!isImageLoaded && <ImageSkeleton />}
                <Image
                  src={getImageUrl(
                    bookmark.manga.folder_group,
                    bookmark.manga.image_id
                  )}
                  alt={bookmark.manga.title}
                  unoptimized
                  fill
                  className={`transform md:group-hover:scale-105 transition-opacity duration-500 md:transition-transform md:duration-300 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ objectFit: "cover" }}
                  onLoadingComplete={() => setIsImageLoaded(true)}
                />
              </div>
              <h3 className="md:text-sm mt-1 sm:mt-1.5 line-clamp-1 text-slate-900 dark:text-white md:group-hover:text-indigo-600">
                {bookmark.manga.title}
              </h3>
            </div>
            <div className="flex gap-2 items-center mt-1 group cursor-pointer w-full">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                <Image
                  src={bookmark.avatar_url}
                  alt={`${bookmark.name}のアバター`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full overflow-hidden">
                <p className="text-xs text-gray-600 md:group-hover:underline decoration-gray-500 truncate">
                  {bookmark.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatBookmarkDate(bookmark.bookmark_date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MangaDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        manga={selectedManga!}
      />
    </div>
  );
};

export default LatestBookmarks;

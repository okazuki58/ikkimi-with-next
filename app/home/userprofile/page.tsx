"use client";

import { useBookmark } from "@/app/context/BookmarkContext";
import { fetchMangaList } from "@/app/lib/data";
import { Manga } from "@/app/lib/definitions";
import ProfileMangaList from "@/app/ui/profileMangaList";
import { BookOpenIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Avatar from "boring-avatars";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { bookmarkedMangas } = useBookmark();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchMangaList()])
      .then(([mangaData]) => {
        setMangas(mangaData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto py-4 max-w-5xl">
      <div className="mb-8">
        <div className="py-6">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-start justify-between w-full">
              <div className="flex gap-3">
                <Avatar
                  name="userna"
                  colors={[
                    "#0a0310",
                    "#49007e",
                    "#ff005b",
                    "#ff7d10",
                    "#ffb238",
                  ]}
                  variant="beam"
                  size={80}
                />
                <div className="flex-1 md:text-left">
                  <h1 className="text-xl font-bold">OtakuSensei</h1>
                  <p className="text-gray-500">@otaku_sensei</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Edit Profile
              </button>
            </div>
            <div>
              <div className="flex flex-wrap justify-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-4 h-4" />
                  <span>{bookmarkedMangas.length} Bookmarks</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>Tokyo, Japan</span>
                </div>
              </div>
              <p className="mb-4">
                アニメとマンガの世界を愛してやまないオタクです。一気読み推奨の作品や、感動したエピソードをいつでも紹介しています！
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="py-10">
          <ProfileMangaList mangas={mangas} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

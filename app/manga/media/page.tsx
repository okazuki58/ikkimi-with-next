"use client";

import { fetchMangasWithMedia } from "@/app/lib/data";
import { Manga } from "@/app/lib/definitions";
import MangaList from "@/app/ui/mangaList";
import { useEffect, useState } from "react";

export default function Media() {
  const [mediaMangas, setMediaMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMangasWithMedia();
        setMediaMangas(data);
        setIsLoading(false);
      } catch (error) {
        console.log("データの取得に失敗しました", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <MangaList mangas={mediaMangas} isLoading={isLoading} limit={50} />
    </div>
  );
}

"use client";

import { fetchMangasWithAwards } from "@/app/lib/data";
import { Manga } from "@/app/lib/definitions";
import MangaList from "@/app/ui/mangaList";
import { useEffect, useState } from "react";

export default function Rising() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMangasWithAwards();
        setMangas(data);
        setIsLoading(false);
      } catch (error) {
        console.log("データの取得に失敗しました", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="py-10">
        <h1 className="text-3xl font-bold">受賞作品</h1>
      </div>
      <div className="py-4">
        <MangaList mangas={mangas} isLoading={isLoading} limit={100} />
      </div>
    </div>
  );
}

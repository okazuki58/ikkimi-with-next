"use client";

import { trendingInSearch } from "@/app/lib/data";
import { Manga } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import MangaList from "@/app/components/manga/MangaList";

export default function TrendingInSearch() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await trendingInSearch();
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
        <h1 className="text-3xl font-bold">検索で話題</h1>
      </div>
      <div className="py-4">
        <MangaList mangas={mangas} isLoading={isLoading} limit={100} />
      </div>
    </div>
  );
}

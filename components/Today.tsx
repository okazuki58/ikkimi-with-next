"use client";

import { useEffect, useState } from "react";
import { Manga } from "@/app/lib/definitions";
import MangaList from "@/app/ui/mangaList";
import { getTodayRecommendedMangas } from "@/app/lib/data";

export default function TodayRecommendations() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const recommendedMangas = await getTodayRecommendedMangas();
      setMangas(recommendedMangas);
      setIsLoading(false);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-4">今日のおすすめ</h2>
      <MangaList mangas={mangas} isLoading={isLoading} limit={10} />
    </div>
  );
}

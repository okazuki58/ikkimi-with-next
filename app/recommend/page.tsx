"use client";

import { useEffect, useState } from "react";
import { Manga } from "../lib/definitions";
import { useUser } from "../context/UserContext";
import { getRecommendedMangas } from "../lib/recommend";
import MangaList from "../ui/mangaList";

export default function RecommendedMangaList() {
  const { user } = useUser();
  const [recommendedMangas, setRecommendedMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (true) {
        const mangas = await getRecommendedMangas(
          "2ad05188-1001-4bca-a398-10af75ba8644"
        );
        setRecommendedMangas(mangas);
      }
      setIsLoading(false);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-4">あなたへのおすすめ</h2>
      <MangaList mangas={recommendedMangas} isLoading={isLoading} limit={14} />
    </div>
  );
}

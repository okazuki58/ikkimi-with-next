"use client";

import { fetchRankingMangas } from "@/app/lib/data";
import { Manga } from "@/app/lib/definitions";
import MangaList from "@/app/components/manga/MangaList";
import Dropdown from "@/app/components/Dropdown";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("all");

  const sortOptions = [
    { value: "all", label: "全期間" },
    { value: "monthly", label: "月間" },
    { value: "weekly", label: "週間" },
    { value: "day", label: "日" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRankingMangas();
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
        <h1 className="text-3xl font-bold">ランキング</h1>
      </div>
      <div className="flex justify-start mb-2">
        <Dropdown
          options={sortOptions}
          selectedValue={sortOption}
          onChange={(value) => setSortOption(value)}
        />
      </div>
      <div className="py-4">
        <MangaList mangas={mangas} isLoading={isLoading} limit={200} />
      </div>
    </div>
  );
}

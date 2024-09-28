"use client";
import { useEffect, useState } from "react";
import { Manga } from "./lib/definitions";
import {
  fetchMangaList,
  fetchRankingMangas,
  fetchRisingManga,
} from "./lib/data";
import Hero from "./ui/hero";
import { MangaListHeader } from "./ui/listHeader";
import MangaList from "./ui/mangaList";
import Divider from "./ui/divider";
import UserList from "./ui/userList";

export default function ContentHome() {
  const [rankingMangas, setRankingMangas] = useState<Manga[]>([]);
  const [risingMangas, setRisingMangas] = useState<Manga[]>([]);
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchMangaList(), fetchRankingMangas(), fetchRisingManga()])
      .then(([mangaData, rankingData, risingData]) => {
        setMangas(mangaData);
        setRankingMangas(rankingData);
        setRisingMangas(risingData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
    console.log(risingMangas);
  }, []);

  return (
    <>
      <Hero />
      <div className="my-4 min-w-full">
        <div className="py-16">
          <MangaListHeader
            sectionTitle="急上昇"
            subSectionTitle="Ranking"
            buttonText="すべて見る"
          />
          <MangaList mangas={risingMangas} isLoading={isLoading} />
        </div>
        <Divider />
        <div className="py-16">
          <MangaListHeader
            sectionTitle="今週のトップ50"
            subSectionTitle="Trending"
            buttonText="すべて見る"
          />
          <MangaList mangas={rankingMangas} isLoading={isLoading} />
        </div>
        <Divider />
        <div className="py-16">
          <MangaListHeader
            sectionTitle="おすすめのユーザー"
            subSectionTitle="Ranking"
            buttonText="すべて見る"
          />
          <UserList />
        </div>
        <Divider />
        <div className="py-16">
          <MangaListHeader
            sectionTitle="あなたにおすすめ"
            subSectionTitle="For You"
            buttonText="すべて見る"
          />
          <MangaList mangas={mangas} isLoading={isLoading} />
        </div>
        <Divider />
        <div className="py-16">
          <MangaListHeader
            sectionTitle="今ブックマークされました"
            subSectionTitle="Just Now"
            buttonText="すべて見る"
          />
          <MangaList mangas={mangas} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Manga } from "../lib/definitions";
import { fetchMangaList } from "../lib/data";
import { MangaListHeader } from "../ui/listHeader";
import MangaList from "../ui/mangaList";
import Divider from "../ui/divider";
import UserList from "../ui/userList";
import Hero from "../ui/hero";

export default function ContentHome() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <>
      <Hero />
      <div className="my-4">
        <div className="py-16">
          <MangaListHeader
            sectionTitle="急上昇"
            subSectionTitle="Ranking"
            buttonText="すべて見る"
          />
          <MangaList mangas={mangas} isLoading={isLoading} />
        </div>
        <Divider />
        <div className="py-16">
          <MangaListHeader
            sectionTitle="今週のトップ10"
            subSectionTitle="Trending"
            buttonText="すべて見る"
          />
          <MangaList mangas={mangas} isLoading={isLoading} />
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
            sectionTitle="今いいね!されました"
            subSectionTitle="Just Now"
            buttonText="すべて見る"
          />
          <MangaList mangas={mangas} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

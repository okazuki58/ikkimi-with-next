"use client";
import { useEffect, useState } from "react";
import { Manga } from "./lib/definitions";
import {
  fetchMangaList,
  fetchMangasWithMedia,
  fetchRankingMangas,
  fetchRisingManga,
} from "./lib/data";
import Hero from "./ui/hero";
import { MangaListHeader } from "./ui/listHeader";
import MangaList from "./ui/mangaList";
import Divider from "./ui/divider";
import UserList from "./ui/userList";
import { useUser } from "./context/UserContext";
import { HeroSkeleton, MangaListSkeleton } from "./ui/skeletons";

export default function ContentHome() {
  const [rankingMangas, setRankingMangas] = useState<Manga[]>([]);
  const [risingMangas, setRisingMangas] = useState<Manga[]>([]);
  const [mediaMangas, setMediaMangas] = useState<Manga[]>([]);
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchMangaList(),
      fetchRankingMangas(),
      fetchRisingManga(),
      fetchMangasWithMedia(),
    ])
      .then(([mangaData, rankingData, risingData, mediaData]) => {
        setMangas(mangaData);
        setRankingMangas(rankingData);
        setRisingMangas(risingData);
        setMediaMangas(mediaData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        {/* {!user && <HeroSkeleton />} */}
        <div className="mb-4 min-w-full">
          <div className="py-16">
            <MangaListSkeleton />
          </div>
          <div className="py-16">
            <MangaListSkeleton />
          </div>
          <div className="py-16">
            <MangaListSkeleton />
          </div>
          <div className="py-16">
            <MangaListSkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {!user && <Hero />}
      <div className="mb-4 min-w-full">
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
            sectionTitle="総合ランキング"
            subSectionTitle="Trending"
            buttonText="すべて見る"
            buttonLink="ranking"
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
            sectionTitle="2024年秋アニメ化作品"
            subSectionTitle="Just Now"
            buttonText="すべて見る"
            buttonLink="media"
          />
          <MangaList mangas={mediaMangas} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

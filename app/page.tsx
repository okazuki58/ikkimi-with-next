"use client";
import { useEffect, useState } from "react";
import { Manga } from "./lib/definitions";
import {
  fetchMangaList,
  fetchMangasWithAwards,
  fetchMangasWithMedia,
  fetchRankingMangas,
  fetchRisingManga,
} from "./lib/data";
import { MangaListHeader } from "./ui/listHeader";
import MangaList from "./ui/mangaList";
import Divider from "./ui/divider";
import UserList from "./ui/userList";
import { useUser } from "./context/UserContext";
import { MangaListSkeleton } from "./ui/skeletons";
import Discover from "@/components/Discover";

export default function ContentHome() {
  const [rankingMangas, setRankingMangas] = useState<Manga[]>([]);
  const [risingMangas, setRisingMangas] = useState<Manga[]>([]);
  const [mediaMangas, setMediaMangas] = useState<Manga[]>([]);
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [awardsMangas, setAwardsMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchMangaList(),
      fetchRankingMangas(),
      fetchRisingManga(),
      fetchMangasWithMedia(),
      fetchMangasWithAwards(),
    ])
      .then(([mangaData, rankingData, risingData, mediaData, awardsData]) => {
        setMangas(mangaData);
        setRankingMangas(rankingData);
        setRisingMangas(risingData);
        setMediaMangas(mediaData);
        setAwardsMangas(awardsData);
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
          <div className="py-16">
            <MangaListSkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* {!user && <Hero />} */}
      <div className="mb-4 min-w-full">
        <Discover />
        {/* <Divider /> */}
        {/* <UserCard />
        <Divider /> */}
        <div className="pb-10">
          <MangaListHeader
            sectionTitle="急上昇"
            buttonText="すべて見る"
            buttonLink="rising"
          />
          <MangaList mangas={risingMangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="総合ランキング"
            buttonText="すべて見る"
            buttonLink="ranking"
          />
          <MangaList mangas={rankingMangas} isLoading={isLoading} limit={21} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="おすすめのユーザー"
            buttonText="すべて見る"
          />
          <UserList />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="あなたにおすすめ"
            buttonText="すべて見る"
          />
          <MangaList mangas={mangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="2024年秋アニメ化作品"
            buttonText="すべて見る"
            buttonLink="media"
          />
          <MangaList mangas={mediaMangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="受賞作品"
            buttonText="すべて見る"
            buttonLink="awards"
          />
          <MangaList mangas={awardsMangas} isLoading={isLoading} limit={14} />
        </div>
      </div>
    </>
  );
}

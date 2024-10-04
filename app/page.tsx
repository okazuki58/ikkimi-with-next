"use client";
import { useEffect, useState } from "react";
import { Manga } from "@/app/lib/definitions";
import {
  fetchMangasByReleaseDate,
  fetchMangasWithAwards,
  fetchMangasWithMedia,
  fetchRankingMangas,
  fetchRisingManga,
  getTodayRecommendedMangas,
} from "@/app/lib/data";
import { MangaListHeader } from "@/app/components/manga/ListHeader";
import MangaList from "@/app/components/manga/MangaList";
import Divider from "@/app/components/layout/Divider";
import UserList from "@/app/components/user/UserList";
import { MangaListSkeleton } from "@/app/components/Skeletons";
import Discover from "@/app/components/Discover";

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

export default function ContentHome() {
  const [risingMangas, setRisingMangas] = useState<Manga[]>([]);
  const [rankingMangas, setRankingMangas] = useState<Manga[]>([]);
  const [mediaMangas, setMediaMangas] = useState<Manga[]>([]);
  const [awardsMangas, setAwardsMangas] = useState<Manga[]>([]);
  const [newReleaseMangas, setNewReleaseMangas] = useState<Manga[]>([]);
  const [todayRecommendedMangas, setTodayRecommendedMangas] = useState<Manga[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const today = dayjs().format("M月D日");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchRankingMangas(),
      fetchRisingManga(),
      fetchMangasWithMedia(),
      fetchMangasWithAwards(),
      getTodayRecommendedMangas(),
      fetchMangasByReleaseDate(today),
    ])
      .then(
        ([
          rankingData,
          risingData,
          mediaData,
          awardsData,
          todayRecommendedData,
          newReleaseData,
        ]) => {
          setRankingMangas(rankingData);
          setRisingMangas(risingData);
          setMediaMangas(mediaData);
          setAwardsMangas(awardsData);
          setTodayRecommendedMangas(todayRecommendedData);
          setNewReleaseMangas(newReleaseData);
          setIsLoading(false);
        }
      )
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
    console.log(newReleaseMangas);
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
            sectionTitle="新着リリース"
            buttonText="すべて見る"
            buttonLink="new_release"
          />
          <MangaList
            mangas={newReleaseMangas}
            isLoading={isLoading}
            limit={14}
          />
        </div>
        <Divider />
        <div className="py-10">
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
          <MangaListHeader sectionTitle="検索で話題" buttonText="すべて見る" />
          <MangaList
            mangas={todayRecommendedMangas}
            isLoading={isLoading}
            limit={14}
          />
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

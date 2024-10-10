"use client";
import { useEffect, useState } from "react";
import { Manga } from "@/app/lib/definitions";
import {
  fetchBLMangas,
  fetchJoseiMangas,
  fetchMangasByReleaseDate,
  fetchMangasWithAwards,
  fetchMangasWithMedia,
  fetchRankingMangas,
  fetchRisingManga,
  fetchSeinenMangas,
  fetchShojoMangas,
  fetchShonenMangas,
  fetchTLMangas,
  trendingInSearch,
} from "@/app/lib/data";
import { MangaListHeader } from "@/app/components/manga/ListHeader";
import MangaList from "@/app/components/manga/MangaList";
import Divider from "@/app/components/layout/Divider";
import UserList from "@/app/components/user/UserList";
import { MangaListSkeleton } from "@/app/components/Skeletons";
import Discover from "@/app/components/Discover";

import dayjs from "dayjs";
import "dayjs/locale/ja";
import LatestBookmarks from "@/app/manga/latestbookmark/clientLatestBookmark";
import { useUser } from "./context/UserContext";
dayjs.locale("ja");

export default function ContentHome() {
  const [risingMangas, setRisingMangas] = useState<Manga[]>([]);
  const [rankingMangas, setRankingMangas] = useState<Manga[]>([]);
  const [mediaMangas, setMediaMangas] = useState<Manga[]>([]);
  const [awardsMangas, setAwardsMangas] = useState<Manga[]>([]);
  const [newReleaseMangas, setNewReleaseMangas] = useState<Manga[]>([]);
  const [trendingInSearchMangas, setTrendingInSearchMangas] = useState<Manga[]>(
    []
  );
  const [shonenMangas, setShonenMangas] = useState<Manga[]>([]);
  const [shojoMangas, setShojoMangas] = useState<Manga[]>([]);
  const [seinenMangas, setSeinenMangas] = useState<Manga[]>([]);
  const [joseiMangas, setJoseiMangas] = useState<Manga[]>([]);
  const [blMangas, setBlMangas] = useState<Manga[]>([]);
  const [tlMangas, setTlMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const today = dayjs().format("M月D日");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchMangasByReleaseDate(today),
      fetchRankingMangas(),
      fetchRisingManga(),
      fetchMangasWithMedia(),
      fetchMangasWithAwards(),
      trendingInSearch(),
      fetchShonenMangas(),
      fetchShojoMangas(),
      fetchSeinenMangas(),
      fetchJoseiMangas(),
      fetchBLMangas(),
      fetchTLMangas(),
    ])
      .then(
        ([
          newReleaseData,
          rankingData,
          risingData,
          mediaData,
          awardsData,
          trendingInSearchData,
          shonenData,
          shojoData,
          seinenData,
          joseiData,
          blData,
          tlData,
        ]) => {
          setNewReleaseMangas(newReleaseData);
          setRankingMangas(rankingData);
          setRisingMangas(risingData);
          setMediaMangas(mediaData);
          setAwardsMangas(awardsData);
          setTrendingInSearchMangas(trendingInSearchData);
          setShonenMangas(shonenData);
          setShojoMangas(shojoData);
          setSeinenMangas(seinenData);
          setJoseiMangas(joseiData);
          setBlMangas(blData);
          setTlMangas(tlData);
          setIsLoading(false);
        }
      )
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
        <Discover user={user} />
        {/* <Divider /> */}
        {/* <UserCard />
        <Divider /> */}
        <div className="pb-10">
          <MangaListHeader
            sectionTitle="最新のブックマーク"
            buttonText="すべて見る"
            buttonLink="latestbookmark"
          />
          <LatestBookmarks />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="新着リリース"
            buttonText="すべて見る"
            buttonLink="new_release"
          />
          {newReleaseMangas.length === 0 ? (
            <p className="text-gray-500">本日の新着リリースはありません</p>
          ) : (
            <MangaList
              mangas={newReleaseMangas}
              isLoading={isLoading}
              limit={14}
            />
          )}
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
            buttonLink="users"
          />
          <UserList />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="検索で話題"
            buttonText="すべて見る"
            buttonLink="trendingInSearch"
          />
          <MangaList
            mangas={trendingInSearchMangas}
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
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="少年漫画"
            buttonText="すべて見る"
            buttonLink="/ranking?category=少年"
          />
          <MangaList mangas={shonenMangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="少女漫画"
            buttonText="すべて見る"
            buttonLink="/ranking?category=少女"
          />
          <MangaList mangas={shojoMangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="青年漫画"
            buttonText="すべて見る"
            buttonLink="/ranking?category=青年"
          />
          <MangaList mangas={seinenMangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="女性漫画"
            buttonText="すべて見る"
            buttonLink="/ranking?category=女性"
          />
          <MangaList mangas={joseiMangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="BL漫画"
            buttonText="すべて見る"
            buttonLink="/ranking?category=BL"
          />
          <MangaList mangas={blMangas} isLoading={isLoading} limit={14} />
        </div>
        <Divider />
        <div className="py-10">
          <MangaListHeader
            sectionTitle="TL漫画"
            buttonText="すべて見る"
            buttonLink="/ranking?category=TL"
          />
          <MangaList mangas={tlMangas} isLoading={isLoading} limit={14} />
        </div>
      </div>
    </>
  );
}

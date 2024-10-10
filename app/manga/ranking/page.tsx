"use client";

import { fetchRankingMangas } from "@/app/lib/data";
import { Manga } from "@/app/lib/definitions";
import Dropdown from "@/app/components/Dropdown";
import { useEffect, useState, useRef } from "react";
import MangaListForRanking from "@/app/components/manga/MangaListForRanking";
import { useRouter, useSearchParams } from "next/navigation";

export default function Ranking() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [sortOption, setSortOption] = useState("all");

  // const sortOptions = [
  //   { value: "all", label: "全期間" },
  //   { value: "monthly", label: "月間" },
  //   { value: "weekly", label: "週間" },
  //   { value: "day", label: "日" },
  // ];

  const categories = [
    "総合",
    "少年",
    "少女",
    "青年",
    "女性",
    "BL",
    "TL",
    "アクション",
    // "オーディオ",
    "グルメ",
    "スポーツ",
    "ドラマ",
    "ファンタジー",
    "ホラー・ミステリー",
    "恋愛",
    "日常",
    "裏社会・アングラ",
  ];


  const [selectedCategory, setSelectedCategory] = useState("総合");
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGradientVisible, setIsGradientVisible] = useState(true);
  // 各ボタンのrefを保持する配列
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // クエリパラメータからカテゴリを取得
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []);

  // ジャンルに基づいてランキングを取得
  const fetchGenreRankingMangas = async (category: string | null) => {
    const response = await fetch(`/api/rankings?category=${category}`);
    const data = await response.json();
    console.log("API response data:", data);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data =
          selectedCategory === "総合"
            ? await fetchRankingMangas()
            : await fetchGenreRankingMangas(selectedCategory);
        setMangas(data);
      } catch (error) {
        console.log("データの取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]); // selectedCategory が変更されるたびにデータを再取得

  // selectedCategoryが変更されたときにボタンの位置を調整
  useEffect(() => {
    const index = categories.indexOf(selectedCategory);
    const button = buttonRefs.current[index];
    const container = containerRef.current;
    if (button && container) {
      const buttonLeft = button.offsetLeft;
      const offset = 20; // ボタンを少し右に配置するためのオフセット
      container.scrollTo({ left: buttonLeft - offset, behavior: "smooth" });
    }
  }, [selectedCategory]);

  // スクロールイベントを監視してグラデーションの表示を切り替え
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;
      setIsGradientVisible(!isAtEnd);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期状態を設定

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchRankingMangas();
  //       setMangas(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log("データの取得に失敗しました", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="py-10">
        <h1 className="text-3xl font-bold">総合ランキング</h1>
      </div>
      {/* <div className="flex justify-start mb-2">
        <Dropdown
          options={sortOptions}
          selectedValue={sortOption}
          onChange={(value) => setSortOption(value)}
        />
      </div> */}
      {/* カテゴリタブ */}
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-2 mb-4 overflow-x-auto py-2 sm:py-4"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => setSelectedCategory(category)}
              className={`h-10 whitespace-nowrap px-4 rounded-md border border-gray-200 ${
                selectedCategory === category
                  ? "border-gray-900"
                  : "md:hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {isGradientVisible && <div className="scroll-gradient"></div>}
      </div>
      <div className="py-4">
        <MangaListForRanking
          mangas={mangas}
          isLoading={isLoading}
          limit={100}
        />
      </div>
    </div>
  );
}

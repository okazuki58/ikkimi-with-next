"use client";

import { useEffect, useState } from "react";
import { Manga } from "@/app/lib/definitions";
import {
  fetchMangaCountsByDates,
  fetchMangasByReleaseDate,
} from "@/app/lib/data";
import MangaList from "@/app/components/manga/MangaList";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

dayjs.locale("ja");

export default function NewReleases() {
  const today = dayjs();

  // 週の開始日を日曜日に設定
  const initialWeekStart = today.startOf("week"); // 日曜日スタート

  // 今月の最初の週開始日と最後の週開始日を計算
  const minWeekStart = today.startOf("month").startOf("week");
  const maxWeekStart = today.endOf("month").startOf("week");

  const [currentWeekStart, setCurrentWeekStart] = useState(initialWeekStart);
  const [selectedDate, setSelectedDate] = useState<string>(
    today.format("M月D日")
  );
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [mangaCounts, setMangaCounts] = useState<{ [date: string]: number }>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchMangasByReleaseDate(selectedDate);
      setMangas(data);
      setIsLoading(false);
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    // 現在の週の日付リストを取得
    const weekDates = getWeekDates().map((date) => date.format("M月D日"));

    // 各日付の漫画数を取得
    const fetchMangaCounts = async () => {
      const counts = await fetchMangaCountsByDates(weekDates);
      setMangaCounts(counts);
      console.log(counts);
    };

    fetchMangaCounts();
  }, [currentWeekStart]);

  // 現在の週の日付を取得
  const getWeekDates = () => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(currentWeekStart.add(i, "day"));
    }
    return weekDates;
  };

  // 前週へボタンのハンドラー
  const handlePreviousWeek = () => {
    if (canGoToPreviousWeek()) {
      const newWeekStart = currentWeekStart.subtract(7, "day");
      setCurrentWeekStart(newWeekStart);
      setSelectedDate(newWeekStart.format("M月D日")); // 週の最初の日付をデフォルトで選択
    }
  };

  // 翌週へボタンのハンドラー
  const handleNextWeek = () => {
    if (canGoToNextWeek()) {
      const newWeekStart = currentWeekStart.add(7, "day");
      setCurrentWeekStart(newWeekStart);
      setSelectedDate(newWeekStart.format("M月D日")); // 週の最初の日付をデフォルトで選択
    }
  };

  // 前週へボタンが有効かどうか
  const canGoToPreviousWeek = () => {
    return currentWeekStart.isAfter(minWeekStart);
  };

  // 翌週へボタンが有効かどうか
  const canGoToNextWeek = () => {
    return currentWeekStart.isBefore(maxWeekStart);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-10">新着リリース</h1>
        {/* 日付ナビゲーション */}
        <div className="flex flex-col items-stretch justify-center max-w-md mx-auto mt-4 gap-3">
          <div className="flex justify-between w-full">
            {/* 前週 */}
            <button
              onClick={handlePreviousWeek}
              disabled={!canGoToPreviousWeek()}
              className={`px-3 py-1 text-sm rounded-md border border-gray-200 ${
                canGoToPreviousWeek()
                  ? "md:hover:bg-gray-100"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className="flex items-center gap-1">
                <ChevronLeftIcon className="size-4" />
                前週へ
              </span>
            </button>

            <div className="text-md font-semibold py-2">2024年10月</div>

            {/* 翌週 */}
            <button
              onClick={handleNextWeek}
              disabled={!canGoToNextWeek()}
              className={`px-3 py-1 text-sm rounded-md border border-gray-200 ${
                canGoToNextWeek()
                  ? "md:hover:bg-gray-100"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className="flex items-center gap-1">
                翌週へ
                <ChevronRightIcon className="size-4" />
              </span>
            </button>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-7 gap-2 w-full">
              {/* 日付ボタン */}
              {getWeekDates().map((date) => {
                const dateStr = date.format("M月D日");
                const count = mangaCounts[dateStr] || 0;
                return (
                  <button
                    key={date.format("YYYY-MM-DD")}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`px-1 py-3 sm:px-2 text-sm rounded-md flex flex-col gap-0.5 items-center border border-gray-200 ${
                      selectedDate === dateStr
                        ? "border-gray-700"
                        : "md:hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-semibold">{date.format("D")}</span>
                    <span
                      className={`text-xs  ${
                        selectedDate === dateStr ? "" : "text-gray-600"
                      }`}
                    >
                      {count}冊
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="py-4">
        {isLoading ? (
          <p>読み込み中...</p>
        ) : mangas.length > 0 ? (
          <MangaList mangas={mangas} isLoading={isLoading} limit={100} />
        ) : (
          <p className="text-center text-gray-500">
            この日に新着リリースはありません。
          </p>
        )}
      </div>
    </div>
  );
}

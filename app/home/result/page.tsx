"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMangaList } from "@/app/lib/data";
import { Manga } from "@/app/lib/definitions";
import MangaList from "@/app/ui/mangaList";
import Fuse from "fuse.js";
import Hero from "@/app/ui/hero";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 文字列の正規化関数
  function normalizeString(str: string) {
    if (!str) return "";
    return str
      .normalize("NFKC")
      .replace(/[\u30A1-\u30FA]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
      )
      .replace(/[\uff66-\uff9d]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0xcf25)
      );
  }

  useEffect(() => {
    const loadResults = async () => {
      const mangaData = await fetchMangaList();

      // データの正規化
      const normalizedData = mangaData.map((manga) => ({
        ...manga,
        title: normalizeString(manga.title),
        authors: manga.authors.map((author: string) => normalizeString(author)), // authors配列内の文字列を正規化
      }));

      // Fuse.jsの初期化
      const options = {
        keys: ["title", "authors"],
        threshold: 0.3,
      };

      const fuse = new Fuse(normalizedData, options);

      // 検索実行
      const normalizedQuery = normalizeString(query);
      const searchResults = fuse.search(normalizedQuery);
      const mangaList = searchResults.map((result: any) => result.item);

      setResults(mangaList);
      setIsLoading(false);
    };

    loadResults();
  }, [query]);

  return (
    <>
      <Hero />
      <div className="container mx-auto max-w-5xl w-full flex flex-col md:py-5 md:px-4 my-20">
        <h1 className="text-2xl font-bold mb-4">検索結果</h1>
        <MangaList mangas={results} isLoading={isLoading} />
      </div>
    </>
  );
}

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

  useEffect(() => {
    const loadResults = async () => {
      const mangaData = await fetchMangaList();

      // Fuse.jsの初期化
      const options = {
        keys: ["title", "reading"],
        threshold: 0.3,
        getFn: (obj: any, path: string | string[]) => {
          // 'path'が文字列か配列かを判定して値を取得
          let value;
          if (Array.isArray(path)) {
            value = path.reduce((acc, key) => acc[key], obj);
          } else {
            value = obj[path];
          }
          // 正規化された文字列を返す
          return normalizeString(value);
        },
      };
      const fuse = new Fuse(mangaData, options);

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
      <div className="container mx-auto max-w-5xl w-full flex flex-col py-5 px-4 my-20">
        <h1 className="text-2xl font-bold mb-4">検索結果</h1>
        <MangaList mangas={results} isLoading={isLoading} />
      </div>
    </>
  );
}

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

"use client";
import algoliasearch from "algoliasearch/lite";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMangaByIds } from "../lib/data";
import MangaList from "@/app/components/manga/MangaList";
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);
const index = searchClient.initIndex("manga_index");

export default function ClientSearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (query.length > 0) {
        const { hits } = await index.search(query);
        const mangaIds = hits.map((hit) => hit.id);
        const mangas = await getMangaByIds(mangaIds);
        // mangas.sort((a, b) => b.bookmark - a.bookmark);

        const mangasMap = new Map();
        mangas.forEach((manga) => {
          mangasMap.set(manga.id, manga);
        });
        const orderedMangas = mangaIds.map((id) => mangasMap.get(id));

        setResults(orderedMangas);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">"{query}"の検索結果</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : results.length > 0 ? (
        <MangaList mangas={results} isLoading={isLoading} limit={50} />
      ) : (
        <p>検索結果が見つかりませんでした。</p>
      )}
    </>
  );
}

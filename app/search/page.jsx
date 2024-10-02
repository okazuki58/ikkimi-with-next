"use client";
import algoliasearch from "algoliasearch/lite";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MangaList from "../ui/mangaList";

const searchClient = algoliasearch(
  "FHD9VGP1JY",
  "cf9f92b6acc760cde5c41c0b41acb407"
);
const index = searchClient.initIndex("manga_index");

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        const { hits } = await index.search(query);
        setResults(hits);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">"{query}"の検索結果</h1>
      {results.length > 0 ? (
        <MangaList mangas={results} isLoading={false} limit={50} />
      ) : (
        <p>検索結果が見つかりませんでした。</p>
      )}
    </div>
  );
}

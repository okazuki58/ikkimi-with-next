"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const searchClient = algoliasearch(
  "FHD9VGP1JY",
  "cf9f92b6acc760cde5c41c0b41acb407"
);
const index = searchClient.initIndex("manga_index");

export default function AlgoSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [isComposing, setIsComposing] = useState(false);
  const suggestionsRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.length > 0) {
        const { hits } = await index.search(debouncedQuery);
        setResults(hits);
        setShowSuggestions(true);
      } else {
        setResults([]);
        setShowSuggestions(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  // エンターキー押下時の処理を追加
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing) {
      // 検索結果ページに遷移、クエリをパラメータとして渡す
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // クリーンアップ
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full md:w-[420px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="作品名、作者名、キーワードで検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          className="w-full py-3 pl-10 pr-12 text-sm md:text-text-md bg-[#f2f2fa] rounded-lg  focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-none"
        />
        <MagnifyingGlassIcon className="size-5 absolute top-1/2 translate-y-[-50%] inset-x-3 text-gray-400" />
        {showSuggestions && results.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute left-0 z-10 mt-1 origin-top-left w-full rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div className="px-3 py-2 text-xs text-left font-semibold text-gray-400 bg-gray-100">
              作品
            </div>
            {results.slice(0, 5).map((hit) => (
              <li
                key={hit.objectID}
                onClick={() => {
                  router.push(`/manga/${hit.id}`);
                }}
                className="px-3 py-3 text-xs text-gray-900 hover:bg-gray-50 cursor-pointer text-left"
              >
                {hit.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

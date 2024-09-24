"use client";

import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { fetchMangaList } from "../lib/data";
import { useRouter } from "next/navigation";
import normalizeString from "@/utils/normalizeString";

// Fuse.js options
const options = {
  keys: ["title", "authors"],
  threshold: 0.3,
};

interface MangaSearchProps {
  onSearch: (value: string) => void;
}

export default function MangaSearch({ onSearch }: MangaSearchProps) {
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [suggestions, setSuggestions] = useState<
    { title: string; author: string }[]
  >([]);
  const [fuse, setFuse] = useState<Fuse<any>>();

  useEffect(() => {
    const loadMangaData = async () => {
      const data = await fetchMangaList();
      const mangalist = data.map((manga) => ({ ...manga }));
      const fuseInstance = new Fuse(mangalist, options);
      setFuse(fuseInstance);
    };
    loadMangaData();
  }, []);

  const router = useRouter();

  // 検索を実行する関数
  const handleSearch = (searchQuery?: string) => {
    const queryToUse = searchQuery || query;
    if (queryToUse) {
      router.push(`/home/result?query=${encodeURIComponent(queryToUse)}`);
    }
  };

  // 入力が変更されたときの処理
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);

    if (value && fuse) {
      const normalizedValue = normalizeString(value);
      const results = fuse.search(normalizedValue);
      setSuggestions(
        results.map((result) => ({
          title: result.item.title,
          author: result.item.authors[0],
        }))
      );
    } else {
      setSuggestions([]);
    }
  };

  // サジェストがクリックされたときの処理
  const handleSuggestionClick = (title: string) => {
    setQuery(title);
    setSuggestions([]);
    handleSearch(title);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange} // 入力変更時の処理
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={(e) => {
          // エンターキーで検索実行
          if (e.key === "Enter" && !isComposing) {
            handleSearch();
          }
        }}
        placeholder="作品名、作者名、キーワードで検索"
        className="w-full h-12 pl-4 pr-12 bg-white rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <button
        type="submit"
        onClick={() => handleSearch()} // 検索ボタンで検索実行
        className="absolute right-2 top-2 rounded-md text-sm font-bold bg-indigo-500 hover:bg-indigo-600 text-white h-8 px-4"
      >
        検索
      </button>
      {suggestions.length > 0 && (
        <div
          id="suggestions"
          className="absolute left-0 z-10 mt-2 w-2/3 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {suggestions.map((suggestion) => (
            <div key={suggestion.title || suggestion.author}>
              <div
                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => handleSuggestionClick(suggestion.title)}
              >
                {suggestion.title}
              </div>
              <div
                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => handleSuggestionClick(suggestion.author)}
              >
                {suggestion.author}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

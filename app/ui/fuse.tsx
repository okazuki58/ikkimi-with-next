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
  includeMatches: true, // マッチ情報を含める
};

interface MangaSearchProps {
  onSearch: (value: string) => void;
}

export default function MangaSearch({ onSearch }: MangaSearchProps) {
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [authorSuggestions, setAuthorSuggestions] = useState<string[]>([]);
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

  const MAX_TITLE_SUGGESTIONS = 5;
  const MAX_AUTHOR_SUGGESTIONS = 5;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);

    if (value && fuse) {
      const normalizedValue = normalizeString(value);
      const results = fuse.search(normalizedValue);

      const titleSet = new Set<string>();
      const authorSet = new Set<string>();

      for (const result of results) {
        if (result.matches) {
          for (const match of result.matches) {
            if (
              match.key === "title" &&
              titleSet.size < MAX_TITLE_SUGGESTIONS
            ) {
              titleSet.add(result.item.title);
            }

            if (
              match.key === "authors" &&
              authorSet.size < MAX_AUTHOR_SUGGESTIONS
            ) {
              // マッチした著者名を取得
              const matchedAuthors = result.item.authors.filter(
                (author: string) => {
                  const normalizedAuthor = normalizeString(author);
                  return normalizedAuthor.includes(normalizedValue);
                }
              );
              matchedAuthors.forEach((author: string) => {
                if (authorSet.size < MAX_AUTHOR_SUGGESTIONS) {
                  authorSet.add(author);
                }
              });
            }
          }
        }

        if (
          titleSet.size >= MAX_TITLE_SUGGESTIONS &&
          authorSet.size >= MAX_AUTHOR_SUGGESTIONS
        ) {
          break;
        }
      }

      setTitleSuggestions(Array.from(titleSet));
      setAuthorSuggestions(Array.from(authorSet));
    } else {
      setTitleSuggestions([]);
      setAuthorSuggestions([]);
    }
  };

  const handleSearch = (searchQuery?: string) => {
    const queryToUse = searchQuery || query;
    if (queryToUse) {
      router.push(`/result?query=${encodeURIComponent(queryToUse)}`);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setQuery(value);
    setTitleSuggestions([]);
    setAuthorSuggestions([]);
    handleSearch(value);
  };

  return (
    <div className="relative">
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
        onClick={() => handleSearch()}
        className="absolute right-2 top-2 rounded-md text-sm font-bold bg-indigo-500 hover:bg-indigo-600 text-white h-8 px-4"
      >
        検索
      </button>
      {(titleSuggestions.length > 0 || authorSuggestions.length > 0) && (
        <div
          id="suggestions"
          className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {titleSuggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs text-left font-semibold text-gray-400 bg-gray-100">
                作品 ({titleSuggestions.length})
              </div>
              {titleSuggestions.map((title) => (
                <div
                  key={title}
                  className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => handleSuggestionClick(title)}
                >
                  {title}
                </div>
              ))}
            </div>
          )}
          {authorSuggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs text-left font-semibold text-gray-400 bg-gray-100">
                作家 ({authorSuggestions.length})
              </div>
              {authorSuggestions.map((author) => (
                <div
                  key={author}
                  className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => handleSuggestionClick(author)}
                >
                  {author}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

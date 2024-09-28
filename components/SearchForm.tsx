"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabaseClient";
import { useDebounce } from "use-debounce";
import { normalizeText } from "@/utils/normalizeString";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500); // 500ミリ秒のデバウンス
  const [titleResults, setTitleResults] = useState<{ id: any; title: any }[]>(
    []
  );
  const [uniqueAuthors, setUniqueAuthors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter(); // ルーティングに使用

  // 最低入力文字数を設定（例：2文字以上）
  const MIN_QUERY_LENGTH = 1;

  // フォーム送信時のハンドラ
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length >= MIN_QUERY_LENGTH) {
      // 入力内容をクエリパラメータとして結果ページに遷移
      router.push(`/result?query=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const searchSuggestions = async () => {
      const value = debouncedQuery;
      if (value.length < MIN_QUERY_LENGTH) {
        // 最低文字数未満の場合は検索候補を非表示にする
        setShowSuggestions(false);
        setTitleResults([]);
        setUniqueAuthors([]);
        return;
      }

      const normalized = normalizeText(value);

      // タイトルにマッチするマンガを取得
      const { data: titleData, error: titleError } = await supabase
        .from("manga")
        .select("id, title")
        .ilike("normalized_title", `%${normalized}%`)
        .limit(6);

      // 著者にマッチするマンガを取得（RPC関数を使用）
      const { data: authorData, error: authorError } = await supabase.rpc(
        "search_manga_by_author",
        {
          query: normalized,
          result_limit: 100, // 一旦多めに取得
        }
      );

      // エラーハンドリング
      if (titleError || authorError) {
        console.error(titleError || authorError);
        setErrorMessage("検索中にエラーが発生しました。");
      } else {
        setTitleResults(titleData || []);

        // 著者名の重複を排除し、正規化してフィルタリング
        const authorsSet = new Set<string>();
        authorData.forEach((manga: { authors: string[] }) => {
          manga.authors.forEach((author) => {
            if (normalizeText(author).includes(normalized)) {
              authorsSet.add(author);
            }
          });
        });
        // 一意の著者名リストを配列に変換し、最大6件に制限
        const authorsArray = Array.from(authorsSet).slice(0, 6);
        setUniqueAuthors(authorsArray);
        setErrorMessage("");

        if ((titleData && titleData.length > 0) || authorsArray.length > 0) {
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      }
    };

    searchSuggestions();
  }, [debouncedQuery]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
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
    <div>
      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="作品名、作者名、キーワードで検索"
          className="w-full h-12 pl-4 pr-12 text-sm md:text-text-md bg-white rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 rounded-md text-sm font-bold bg-indigo-500 hover:bg-indigo-600 text-white h-8 px-4"
        >
          検索
        </button>

        {showSuggestions &&
          (titleResults.length > 0 || uniqueAuthors.length > 0) && (
            <div
              id="suggestions"
              ref={suggestionsRef}
              className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5"
            >
              {titleResults.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs text-left font-semibold text-gray-400 bg-gray-100">
                    作品
                  </div>
                  {titleResults.map((manga) => (
                    <div
                      key={manga.id}
                      className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer text-left"
                      onClick={() => {
                        // マンガ詳細ページに遷移（適宜パスを調整）
                        router.push(`/manga/${manga.id}`);
                        setShowSuggestions(false);
                      }}
                    >
                      {manga.title}
                    </div>
                  ))}
                </div>
              )}
              {uniqueAuthors.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs text-left font-semibold text-gray-400 bg-gray-100">
                    作家
                  </div>
                  {uniqueAuthors.map((author, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer text-left"
                      onClick={() => {
                        // 著者ページに遷移（適宜パスを調整）
                        router.push(`/author/${encodeURIComponent(author)}`);
                        setShowSuggestions(false);
                      }}
                    >
                      {author}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
      </form>

      {/* エラーメッセージ */}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default SearchForm;

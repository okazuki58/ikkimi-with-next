"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);
const index = searchClient.initIndex("manga_index");

export default function AlgoSearch({ inputRef, onBlur }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [isComposing, setIsComposing] = useState(false);
  const suggestionsRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();
  const isComponentActive = useRef(true);

  useEffect(() => {
    // コンポーネントがマウントされたときにアクティブと設定
    isComponentActive.current = true;

    // クリーンアップ関数でアンマウント時にアクティブを解除
    return () => {
      isComponentActive.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.length > 0) {
        const { hits } = await index.search(debouncedQuery, {
          clickAnalytics: true,
        });
        if (isComponentActive.current) {
          setResults(hits);
          setShowSuggestions(true);
        }
      } else {
        if (isComponentActive.current) {
          setResults([]);
          setShowSuggestions(false);
        }
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

  const handleFocus = () => {
    isComponentActive.current = true;
  };

  // エンターキー押下時の処理を追加
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing && query.length > 0) {
      // 検索結果ページに遷移、クエリをパラメータとして渡す
      router.push(`/search?query=${encodeURIComponent(query)}`);

      // 入力欄からフォーカスを外す（キーボードを非表示にする）
      if (inputRef && inputRef.current) {
        inputRef.current.blur();
      }

      // コンポーネントを非アクティブに設定
      isComponentActive.current = false;

      setShowSuggestions(false);
      if (onBlur) {
        onBlur();
      }
    }
  };

  const handleBlur = () => {
    // コンポーネントを非アクティブに設定
    isComponentActive.current = false;

    if (onBlur) {
      onBlur();
    }
  };

  // サジェスト項目をクリックしたときの処理
  const handleSuggestionClick = (hit) => {
    router.push(`/manga/${hit.id}`);
    if (onBlur) {
      onBlur();
    }
    setShowSuggestions(false);
  };

  // 入力欄が変更されたときの処理
  const handleChange = (e) => {
    setQuery(e.target.value);

    // コンポーネントをアクティブに設定
    if (!isComponentActive.current) {
      isComponentActive.current = true;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type="text"
          ref={inputRef}
          placeholder="作品名、作者名、キーワードで検索"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          enterKeyHint="search"
          className="bg-white w-full h-10 py-2 pl-10 sm:text-sm border border-gray-300 rounded-lg  focus:border-primary md:hover:border-primary transition"
        />
        <MagnifyingGlassIcon className="size-5 absolute top-1/2 -translate-y-1/2 inset-x-3 text-gray-400" />
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
                onMouseDown={() => handleSuggestionClick(hit)}
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

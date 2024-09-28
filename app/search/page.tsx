"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { supabase } from "@/utils/supabaseClient";

interface Manga {
  id: number;
  title: string;
  description: string;
  authors: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<Manga[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .rpc("search_manga", { query })
        .limit(10);

      if (error) {
        console.error("検索エラー:", error);
        setErrorMessage("検索中にエラーが発生しました");
      } else {
        setResults(data || []);
        setErrorMessage("");
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="漫画のタイトルを入力"
          className="border p-2 rounded w-full"
        />
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {results.length > 0 && (
        <ul className="border rounded shadow-md bg-white">
          {results.map((manga) => (
            <li
              key={manga.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                window.location.href = `/manga/${manga.id}`;
              }}
            >
              <p className="font-semibold">{manga.title}</p>
              <p className="text-sm text-gray-600">
                著者: {manga.authors.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import MangaSearch from "./fuse";
import SearchForm from "@/components/SearchForm";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-between py-6 ">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center flex-grow text-center">
        <div className="w-full max-w-xl mb-8">
          <div className="relative">
            {/* <MangaSearch onSearch={handleSearch} /> */}
            <SearchForm />
          </div>
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          style={{ lineHeight: "1.4" }}
        >
          次に読む漫画が、ここで見つかる。
        </h1>
        <p
          className="text-md text-gray-700 max-w-2xl"
          style={{ lineHeight: "1.6" }}
        >
          おすすめの一気見リストを共有して、次の面白い漫画をすぐに見つけよう。
          <br />
          イッキミはあなたの漫画探しをスマートかつ迅速にします。
        </p>
      </div>
    </div>
  );
}

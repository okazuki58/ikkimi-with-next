"use client";

import { useState } from "react";
import MangaSearch from "./fuse";
import SearchForm from "@/components/SearchForm";
import { Button } from "./button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-between py-32 gap-8 w-full max-w-5xl">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center flex-grow text-center">
        {/* <div className="w-full max-w-xl mb-8">
          <div className="relative">
            <SearchForm />
          </div>
        </div> */}
        <h1
          className="text-4xl md:text-5xl font-note_sans_jp font-bold mb-4 text-[#21213b] "
          style={{ lineHeight: "1.4" }}
        >
          次に読む漫画が、
          <br className="sm:hidden" />
          ここで見つかる。
        </h1>
        <p
          className="text-md md:text-lg font-note_sans_jp text-[#21213b] max-w-2xl"
          style={{ lineHeight: "1.6" }}
        >
          おすすめの一気見リストを共有して、次の面白い漫画をすぐに見つけよう。
          <br className="hidden sm:block" />
          <span className="font-unbounded">Ikkimi</span>
          （イッキミ）はあなたの漫画探しをスマートかつ迅速にします。
        </p>
      </div>
      <div className="max-w-xs">
        <Link href="/signup">
          <Button className="h-14 px-8">さっそくはじめる</Button>
        </Link>
      </div>
    </div>
  );
}

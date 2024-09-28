"use client";

import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { useBookmark } from "../context/BookmarkContext";
import { toast } from "sonner";
import { useState } from "react";

interface BookmarkButtonProps {
  mangaId: number;
  bookmark: number;
}

export default function BookmarkButton({
  mangaId,
  bookmark,
}: BookmarkButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { bookmarkedMangas, animatingMangas, toggleBookmark } =
    useBookmark();
  const isBookmarked = bookmarkedMangas.includes(mangaId);
  const [bookmarkCount, setBookmarkCount] = useState(bookmark || 0);

  const handleClick = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await toggleBookmark(mangaId);
      // ブックマーク数を更新
      setBookmarkCount((prevCount) =>
        isBookmarked ? prevCount - 1 : prevCount + 1
      );
    } finally {
      setIsProcessing(false);
    }
    const message = isBookmarked
      ? "ブックマークを解除しました"
      : "ブックマークを追加しました";
    toast.success(message);
  };

  return (
    <>
      <button
        className="flex items-center cursor-pointer group"
        onClick={handleClick}
        disabled={isProcessing}
      >
        {bookmarkedMangas.includes(mangaId) ? (
          <BookmarkSolid
            className={`size-4 transition-transform transform ${
              animatingMangas.includes(mangaId)
                ? "animate-smoothBounce text-slate-600"
                : "text-slate-600"
            }`}
          />
        ) : (
          <BookmarkOutline
            className={`size-4 transition-transform transform group-hover:text-slate-600 ${
              animatingMangas.includes(mangaId)
                ? "animate-smoothBounce text-slate-400"
                : "text-slate-400"
            }`}
          />
        )}
        <span className="text-sm ml-1 text-gray-500 group-hover:text-slate-600">
          {bookmarkCount.toLocaleString()}
        </span>
      </button>
    </>
  );
}

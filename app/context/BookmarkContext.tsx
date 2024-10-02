"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getUserBookmarks,
  deleteBookmark,
  saveBookmark,
  getBookmarkCounts,
} from "../lib/actions"; // getBookmarkCount を追加
import { useUser } from "./UserContext";

interface BookmarkContextType {
  bookmarkedMangas: number[];
  toggleBookmark: (mangaId: number) => void;
  animatingMangas: number[];
  refreshBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export const BookmarkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const [bookmarkedMangas, setBookmarkedMangas] = useState<number[]>([]);
  const [animatingMangas, setAnimatingMangas] = useState<number[]>([]);

  // ブックマーク情報を再取得する関数
  const refreshBookmarks = async () => {
    if (user) {
      // ユーザーのブックマークを取得
      const bookmarks = await getUserBookmarks(user.id);
      setBookmarkedMangas(bookmarks);
    }
  };

  // ログインユーザーのブックマーク情報とブックマーク数を取得
  useEffect(() => {
    refreshBookmarks();
  }, [user]);

  const toggleBookmark = async (mangaId: number) => {
    console.log("mangaId:", mangaId, typeof mangaId);
    if (mangaId == null) {
      console.error("mangaId is null or undefined");
    }
    // アニメーションをトリガー
    setAnimatingMangas((prev) => [...prev, mangaId]);
    setTimeout(() => {
      setAnimatingMangas((prev) => prev.filter((id) => id !== mangaId));
    }, 500);

    try {
      const isBookmarked = bookmarkedMangas.includes(mangaId);

      if (isBookmarked) {
        await deleteBookmark(user?.id, mangaId);
      } else {
        await saveBookmark(user?.id, mangaId);
      }

      // ブックマーク情報とカウントを再取得
      await refreshBookmarks();
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      // エラーメッセージの表示など必要に応じて追加
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedMangas,
        animatingMangas,
        toggleBookmark,
        refreshBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
};

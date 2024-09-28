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
  bookmarkCounts: { [mangaId: number]: number }; // ブックマーク数を管理
  toggleBookmark: (mangaId: number) => void;
  animatingMangas: number[];
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
  const [bookmarkCounts, setBookmarkCounts] = useState<{
    [mangaId: number]: number;
  }>({});
  const [animatingMangas, setAnimatingMangas] = useState<number[]>([]);

  // ログインユーザーのブックマーク情報とブックマーク数を取得
  useEffect(() => {
    const fetchBookmarkCounts = async () => {
      const counts = await getBookmarkCounts(); // すべての漫画のブックマーク数を取得する関数を実装する
      setBookmarkCounts(counts);
    };

    fetchBookmarkCounts();

    if (user) {
      const fetchUserBookmarks = async () => {
        const bookmarks = await getUserBookmarks(user.id);
        setBookmarkedMangas(bookmarks);
      };

      fetchUserBookmarks();
    }
  }, [user]);

  const toggleBookmark = async (mangaId: number) => {
    const isBookmarked = bookmarkedMangas.includes(mangaId);
    setBookmarkedMangas((prev) =>
      isBookmarked ? prev.filter((id) => id !== mangaId) : [...prev, mangaId]
    );

    // ブックマーク数を更新
    setBookmarkCounts((prevCounts) => ({
      ...prevCounts,
      [mangaId]: (prevCounts[mangaId] || 0) + (isBookmarked ? -1 : 1),
    }));

    // アニメーションをトリガー
    setAnimatingMangas((prev) => [...prev, mangaId]);
    setTimeout(() => {
      setAnimatingMangas((prev) => prev.filter((id) => id !== mangaId));
    }, 500);

    // データベースを更新
    try {
      if (isBookmarked) {
        await deleteBookmark(user?.id, mangaId);
      } else {
        await saveBookmark(user?.id, mangaId);
      }
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      // エラー時には状態を元に戻す
      setBookmarkedMangas((prev) =>
        isBookmarked ? [...prev, mangaId] : prev.filter((id) => id !== mangaId)
      );

      // ブックマーク数も元に戻す
      setBookmarkCounts((prevCounts) => ({
        ...prevCounts,
        [mangaId]: (prevCounts[mangaId] || 0) + (isBookmarked ? 1 : -1),
      }));
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedMangas,
        bookmarkCounts,
        animatingMangas,
        toggleBookmark,
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

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserBookmarks, deleteBookmark, saveBookmark } from "../lib/actions";
import { useUser } from "./UserContext";

const TEMP_USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a";

interface BookmarkContextType {
  bookmarkedMangas: number[];
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
  const [animatingMangas, setAnimatingMangas] = useState<number[]>([]);

  // 初回ロード時にログインユーザーのブックマーク情報を反映
  useEffect(() => {
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

    // アニメーションをトリガー
    setAnimatingMangas((prev) => [...prev, mangaId]);
    setTimeout(() => {
      setAnimatingMangas((prev) => prev.filter((id) => id !== mangaId));
    }, 500); // アニメーションの時間に合わせて調整

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
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedMangas, animatingMangas, toggleBookmark }}
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

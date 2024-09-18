"use client";

import { useEffect, useState } from "react";
import styles from "./likeButton.module.css";
import { addLike, removeLike } from "../lib/actions";

const TEMP_USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a";

export default function LikeButton({
  initialLikes,
  mangaId,
  isLiked,
  onMangaUpdate,
}: {
  initialLikes: number;
  mangaId: number;
  isLiked: boolean;
  onMangaUpdate: (mangaId: number, isLiked: boolean) => void;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsLikedState(isLiked);
    setLikes(initialLikes);
  }, [isLiked, initialLikes]);

  const handleLike = async () => {
    setIsAnimating(true);
    const newIsLikedState = !isLikedState;
    setIsLikedState(newIsLikedState);
    setLikes((prev) => (newIsLikedState ? prev + 1 : prev - 1));
    onMangaUpdate(mangaId, newIsLikedState);

    try {
      const newIsLikedState = !isLikedState;
      if (newIsLikedState) {
        await addLike(TEMP_USER_ID, mangaId);
      } else {
        await removeLike(TEMP_USER_ID, mangaId);
      }
    } catch (error) {
      console.error("Failed to update like:", error);
      // エラーが発生した場合、状態を元に戻す
      setIsLikedState(!newIsLikedState);
      setLikes((prev) => (newIsLikedState ? prev - 1 : prev + 1));
      onMangaUpdate(mangaId, !newIsLikedState);
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleLike}
      className={`${styles.likeButton} ${isLikedState ? styles.liked : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`${styles.heart} ${isAnimating ? styles.animate : ""}`}
        width="22"
        height="22"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span className={styles.likeCount}>{likes.toLocaleString()}</span>
    </button>
  );
}

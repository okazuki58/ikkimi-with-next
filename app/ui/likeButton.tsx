"use client";

import { useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export default function LikeButton({
  initialLikes,
  mangaId,
}: {
  initialLikes: number;
  mangaId: number;
}) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 text-gray-500 md:hover:text-red-500 transition-colors duration-200"
    >
      {isLiked ? (
        <HeartSolid className="w-5 h-5 text-red-500" />
      ) : (
        <HeartOutline className="w-5 h-5" />
      )}
      <span className="text-sm font-medium font-chirp">
        {likes.toLocaleString()}
      </span>
    </button>
  );
}

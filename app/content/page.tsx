"use client";

import { fetchMangaList } from "../lib/data";
import MangaList from "../ui/mangaList";
import { useState, useEffect } from "react";
import { Manga } from "../lib/definitions";
import { getUserLikes } from "../lib/actions";
import Divider from "../ui/divider";

const TEMP_USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a";

export default function ContentHome() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [userLikes, setUserLikes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchMangaList(), getUserLikes(TEMP_USER_ID)])
      .then(([mangaData, likesData]) => {
        setMangas(mangaData);
        setUserLikes(likesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, []);

  // likeButtonまで渡る関数　データベースではなく画面の状態のみ管理する
  const onMangaUpdate = (mangaId: number, isLiked: boolean) => {
    setMangas((prevMangas) =>
      prevMangas.map((manga) =>
        manga.id === mangaId
          ? { ...manga, likes: isLiked ? manga.likes + 1 : manga.likes - 1 }
          : manga
      )
    );
    setUserLikes((prevLikes) =>
      isLiked
        ? [...prevLikes, mangaId]
        : prevLikes.filter((id) => id !== mangaId)
    );
  };

  return (
    <div className="container mx-auto max-w-5xl w-full flex flex-col gap-5 py-5 px-4">
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="ランキング"
        onMangaUpdate={onMangaUpdate}
        isLoading={isLoading}
      />
      <Divider />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="今話題の作品"
        onMangaUpdate={onMangaUpdate}
        isLoading={isLoading}
      />
      <Divider />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="ユーザー広場"
        onMangaUpdate={onMangaUpdate}
        isLoading={isLoading}
      />
      <Divider />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="今いいね!されました"
        onMangaUpdate={onMangaUpdate}
        isLoading={isLoading}
      />
    </div>
  );
}

"use client";

import { fetchMangaList } from "../lib/data";
import MangaList from "../ui/mangaList";
import { useState, useEffect } from "react";
import { Manga } from "../lib/definitions";
import { getUserLikes } from "../lib/actions";

const TEMP_USER_ID = "410544b2-4001-4271-9855-fec4b6a6442a";

export default function ContentHome() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [userLikes, setUserLikes] = useState<number[]>([]);

  useEffect(() => {
    fetchMangaList().then(setMangas);
    getUserLikes(TEMP_USER_ID).then(setUserLikes); //特定のユーザーのいいね情報をデータベースから取得
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
    <div className="container mx-auto max-w-5xl w-full flex flex-col gap-5 py-5">
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="Top Manga Rankings"
        onMangaUpdate={onMangaUpdate}
      />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="Trending"
        onMangaUpdate={onMangaUpdate}
      />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="Your Friends Are Reading"
        onMangaUpdate={onMangaUpdate}
      />
    </div>
  );
}

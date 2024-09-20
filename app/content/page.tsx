"use client";

import { fetchMangaList } from "../lib/data";
import MangaList from "../ui/mangaList";
import { useState, useEffect } from "react";
import { Manga } from "../lib/definitions";
import { getUserLikes } from "../lib/actions";
import Divider from "../ui/divider";
import UserList from "../ui/userList";
import Hero from "../ui/hero";

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

  return (
    <div className="container mx-auto max-w-5xl w-full flex flex-col gap-5 py-5 px-4">
      <Hero />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="ランキング"
        isLoading={isLoading}
      />
      <Divider />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="今話題の作品"
        isLoading={isLoading}
      />
      <Divider />
      <UserList />
      <Divider />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="ユーザー広場"
        isLoading={isLoading}
      />
      <Divider />
      <MangaList
        mangas={mangas}
        userLikes={userLikes}
        sectionTitle="今いいね!されました"
        isLoading={isLoading}
      />
    </div>
  );
}

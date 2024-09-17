"use client";

import Image from "next/image";
import { Manga } from "../lib/definitions";
import LikeButton from "./likeButton";
import { useState } from "react";
import MangaDialog from "./dialog";

export default function MangaList({
  mangas,
  sectionTitle,
}: {
  mangas: Manga[];
  sectionTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 50);
  };

  return (
    <div>
      <h2 className="tracking-light text-3xl font-bold leading-tight px-4">
        {sectionTitle}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {mangas.map((manga) => (
          <div key={manga.id} className="flex flex-col pb-5">
            <div
              className="flex flex-col gap-2 group pb-2 hover:cursor-pointer"
              onClick={() => openDialog(manga)}
            >
              <div className="rounded-md overflow-hidden">
                <Image
                  src={manga.cover_url}
                  alt={manga.title}
                  width={549}
                  height={780}
                  style={{ objectFit: "cover" }}
                  className="transition-transform transform md:group-hover:scale-105"
                />
              </div>
              <h3 className="md:text-sm line-clamp-2">{manga.title}</h3>
            </div>
            <LikeButton initialLikes={manga.likes} mangaId={manga.id} />
          </div>
        ))}
      </div>
      <MangaDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        manga={selectedManga}
        isAnimating={isAnimating}
      />
    </div>
  );
}

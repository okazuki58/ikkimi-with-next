"use client";

import Image from "next/image";
import Link from "next/link";
import { Manga } from "../lib/definitions";
import { HeartIcon } from "@heroicons/react/24/outline";
import MangaDialog from "./dialog";
import { useState } from "react";

export default function MangaList({
  mangas,
  sectionTitle,
}: {
  mangas: Manga[];
  sectionTitle: string;
}) {
  let [isOpen, setIsOpen] = useState(false);
  let [selectedManga, setSelectedManga] = useState<Manga | null>(null);

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
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
              // href={`/content/description/${manga.id}`}
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
              <h3 className="text-sm font-medium line-clamp-2">
                {manga.title}
              </h3>
            </div>
            <button className="flex gap-1 text-gray-500">
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm">1,900</span>
            </button>
          </div>
        ))}
      </div>
      <MangaDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        manga={selectedManga}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { Manga, Profile } from "../lib/definitions";
import { useBookmark } from "../context/BookmarkContext";
import { fetchUserBookmarkedMangas } from "../lib/actions";
import Image from "next/image";
import { BookOpenIcon, MapPinIcon } from "@heroicons/react/24/outline";
import MangaList from "../ui/mangaList";
import ModalComponent from "@/components/ProfileEditModal";
import { ProfileSkeleton } from "../ui/skeletons";
import {
  fetchUserBookmarkedMangasWithCreatedAt,
  fetchUserBookmarksWithDate,
  fetchUserProfileByUsername,
} from "../lib/data";
import Dropdown from "@/components/Dropdown";
import { useUser } from "../context/UserContext";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user } = useUser();
  // const { profile } = useProfile();
  const { username } = params;
  const [profile, setProfile] = useState<Profile | null>(null);
  // const { bookmarkedMangas } = useBookmark();
  const [bookmarkedMangas, setBookmarkedMangas] = useState<Manga[]>([]);
  // const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("bookmark_date");

  const sortOptions = [
    { value: "bookmark_date", label: "ブックマークした順" },
    { value: "title", label: "タイトル順" },
    { value: "bookmark_count", label: "ブックマーク数順" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // 指定されたユーザー名からプロフィールを取得
      const userProfile = await fetchUserProfileByUsername(username);
      if (!userProfile) {
        // ユーザーが存在しない場合の処理（エラーページの表示など）
        setIsLoading(false);
        return;
      }
      setProfile(userProfile);

      // ユーザーのブックマークを取得
      const userBookmarkedMangas = await fetchUserBookmarkedMangasWithCreatedAt(
        userProfile.id
      );

      setBookmarkedMangas(userBookmarkedMangas);
      console.log(userBookmarkedMangas);
      setIsLoading(false);
    };

    fetchData();
  }, [username]);

  // 並び替え関数
  const sortMangas = (mangas: Manga[]) => {
    switch (sortOption) {
      case "title":
        return [...mangas].sort((a, b) => a.title.localeCompare(b.title, "ja"));
      case "bookmark_count":
        return [...mangas].sort(
          (a, b) => (b.bookmark || 0) - (a.bookmark || 0)
        );
      case "bookmark_date":
      default:
        // ブックマーク日時の降順（既に降順になっているためそのまま返す）
        return mangas;
    }
  };

  const sortedMangas = sortMangas(bookmarkedMangas);

  if (isLoading) {
    return (
      <div className="container mx-auto py-4 max-w-5xl">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-4 max-w-5xl">
        <p>ユーザーが見つかりませんでした</p>
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="container mx-auto py-4 max-w-5xl">
      <div className="mb-8">
        <div className="py-6">
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <div className="w-28 h-28 rounded-full overflow-hidden border relative">
                <Image
                  src={profile.avatar_url}
                  alt={`${profile.name}のアバター`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col md:text-left mb-4 gap-1">
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-gray-500">{profile.username}</p>
              </div>
              <div>
                <div className="flex flex-wrap justify-start gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-4 h-4" />
                    <span>{bookmarkedMangas.length} Bookmarks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>Tokyo, Japan</span>
                  </div>
                </div>
                <p className="mb-4">{profile.bio}</p>
              </div>
              {isOwnProfile ? (
                <button
                  type="button"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 border transition md:hover:bg-gray-100 md:max-w-sm"
                  onClick={() => setIsOpen(true)}
                >
                  プロフィールを編集
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white border transition md:hover:bg-gray-800 md:max-w-sm"
                >
                  フォロー
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="flex justify-end mb-2">
          <Dropdown
            options={sortOptions}
            selectedValue={sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        <div className="py-4">
          <MangaList mangas={sortedMangas} isLoading={isLoading} limit={100} />
        </div>
      </div>

      {isOwnProfile && (
        <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}

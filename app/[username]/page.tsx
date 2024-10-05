"use client";

import { useEffect, useState } from "react";
import { Manga, Profile } from "../lib/definitions";
import Image from "next/image";
import { LinkIcon } from "@heroicons/react/24/outline";
import MangaList from "../components/manga/MangaList";
import ModalComponent from "@/app/components/modal/ProfileEditModal";
import { ProfileSkeleton } from "../components/Skeletons";
import {
  fetchUserBookmarkedMangasWithCreatedAt,
  fetchUserProfileByUsername,
} from "../lib/data";
import Dropdown from "@/app/components/Dropdown";
import { useUser } from "../context/UserContext";
import { createClient } from "@/utils/supabase/client";
import XLogo from "@/app/components/XLogo";
import Link from "next/link";
import LoginModal from "@/app/components/modal/LoginModal";
import NotFound from "../not-found";
interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user } = useUser();
  const { username } = params;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookmarkedMangas, setBookmarkedMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("bookmark_date");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const supabase = createClient();

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
      setIsLoading(false);
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    const checkIfFollowing = async () => {
      if (user && profile && user.id !== profile.id) {
        const { data, error } = await supabase
          .from("follows")
          .select("*")
          .eq("follower_id", user.id)
          .eq("followed_id", profile.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // エラーコードが'PGRST116'（行が見つからない場合）でない場合
          console.error("フォロー状態の取得に失敗しました：", error);
        } else {
          setIsFollowing(!!data); // データがあればtrue、なければfalse
        }
      }
    };

    checkIfFollowing();

    const fetchFollowCounts = async () => {
      if (profile) {
        // フォロワー数を取得
        const { count: followers } = await supabase
          .from("follows")
          .select("*", { count: "exact", head: true })
          .eq("followed_id", profile.id);

        setFollowersCount(followers || 0);

        // フォロー中の数を取得
        const { count: following } = await supabase
          .from("follows")
          .select("*", { count: "exact", head: true })
          .eq("follower_id", profile.id);

        setFollowingCount(following || 0);
      }
    };

    fetchFollowCounts();
  }, [user, profile]);

  const handleFollowToggle = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (isFollowing) {
      // アンフォロー
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("followed_id", profile?.id);

      if (error) {
        console.error("アンフォローに失敗しました：", error);
      } else {
        setIsFollowing(false);
      }
      setFollowersCount(followersCount - 1);
    } else {
      // フォロー
      const { error } = await supabase.from("follows").insert({
        follower_id: user.id,
        followed_id: profile?.id,
      });

      if (error) {
        console.error("フォローに失敗しました：", error);
      } else {
        setIsFollowing(true);
      }
    }
    setFollowersCount(followersCount + 1);
  };

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
    return <NotFound />;
  }

  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="container mx-auto py-4 max-w-5xl">
      <div className="mb-8">
        <div className="py-6">
          <div className="flex flex-col sm:flex-row gap-8 w-full">
            <div>
              <div className="w-28 h-28 rounded-full overflow-hidden border relative">
                <Image
                  src={profile.avatar_url}
                  alt={`${profile.name}のアバター`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between md:text-left mb-4 gap-1">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {/* <p className="text-gray-500">{profile.username}</p> */}
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
                    onClick={handleFollowToggle}
                    className={`px-4 py-2 text-sm  transition font-bold rounded-md focus:outline-none w-[120px] border ${
                      isFollowing
                        ? "bg-white text-slate-900 md:hover:bg-slate-100"
                        : "bg-slate-900 text-white md:hover:bg-slate-800"
                    }`}
                  >
                    {isFollowing ? "フォロー中" : "フォロー"}
                  </button>
                )}
              </div>

              <div>
                <p className="mb-4">{profile.bio}</p>

                <div className="flex flex-wrap justify-start gap-4 mb-4">
                  <p className="flex items-center gap-1">
                    <span className="font-semibold">
                      {bookmarkedMangas.length}
                    </span>{" "}
                    <span className="text-gray-600 text-sm font-medium">
                      ブックマーク
                    </span>
                  </p>
                  <p className="flex items-center gap-1 group">
                    <span className="font-semibold">{followingCount}</span>{" "}
                    <span className="text-gray-600 text-sm font-medium group-hover:text-gray-900 cursor-pointer">
                      フォロー中
                    </span>
                  </p>
                  <p className="flex items-center gap-1 group">
                    <span className="font-semibold">{followersCount}</span>{" "}
                    <span className="text-gray-600 text-sm font-medium group-hover:text-gray-900 cursor-pointer">
                      フォロワー
                    </span>
                  </p>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {profile.x_username && (
                    <div className="tooltip">
                      <Link
                        href={`https://x.com/${profile.x_username}`}
                        target="_blank"
                      >
                        <XLogo />
                      </Link>
                      <span className="tooltiptext">{profile.x_username}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="tooltip">
                      <Link href={profile.website} target="_blank">
                        <LinkIcon
                          className="size-5 text-gray-400 md:hover:text-gray-900 cursor-pointer"
                          strokeWidth={2}
                        />
                      </Link>
                      <span className="tooltiptext">{profile.website}</span>
                    </div>
                  )}
                </div>
              </div>
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
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

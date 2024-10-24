"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { Manga, Profile } from "../lib/definitions";
import Image from "next/image";
import { LinkIcon } from "@heroicons/react/24/outline";
import MangaList from "../components/manga/MangaList";
import ModalComponent from "@/app/components/modal/ProfileEditModal";
import { ProfileSkeleton } from "../components/Skeletons";
import { fetchUserBookmarkedMangasWithCreatedAt } from "../lib/data";
import Dropdown from "@/app/components/Dropdown";
import { useUser } from "../context/UserContext";
import { createClient } from "@/utils/supabase/client";
import XLogo from "@/app/components/XLogo";
import Link from "next/link";
import LoginModal from "@/app/components/modal/LoginModal";
import FollowingModal from "@/app/components/modal/FollowingModal";

import NotFound from "../not-found";
import FollowersModal from "../components/modal/FollowersModal";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePageContent({ params }: ProfilePageProps) {
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
  // フォロー中のユーザーリストを管理する状態変数
  const [followingUsers, setFollowingUsers] = useState<Profile[]>([]);
  // フォロー中モーダルの表示状態を管理する状態変数
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  // フォロワーのユーザーリストを管理する状態変数
  const [followers, setFollowers] = useState<Profile[]>([]);
  // フォロワーモーダルの表示状態を管理する状態変数
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);

  // ログインユーザーがフォローしているユーザーのIDを管理
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  const supabase = createClient();

  const sortOptions = [
    { value: "bookmark_date", label: "ブックマークした順" },
    { value: "title", label: "タイトル順" },
    { value: "bookmark_count", label: "ブックマーク数順" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Supabaseクライアントの作成
      const supabase = createClient();

      // プロフィール情報の取得
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (profileError || !profileData) {
        setIsLoading(false);
        return;
      }
      setProfile(profileData);

      // ブックマークの取得
      const userBookmarkedMangas = await fetchUserBookmarkedMangasWithCreatedAt(
        profileData.id
      );
      setBookmarkedMangas(userBookmarkedMangas);

      // フォロワー数とフォロー中の数を並列で取得
      const [{ count: followersCount }, { count: followingCount }] =
        await Promise.all([
          supabase
            .from("follows")
            .select("*", { count: "exact", head: true })
            .eq("followed_id", profileData.id),
          supabase
            .from("follows")
            .select("*", { count: "exact", head: true })
            .eq("follower_id", profileData.id),
        ]);

      setFollowersCount(followersCount || 0);
      setFollowingCount(followingCount || 0);

      // ユーザーがログインしている場合、フォロー状態とフォロー中のユーザーIDを取得
      if (user) {
        await Promise.all([
          checkIfFollowing(user.id, profileData.id),
          fetchFollowingIds(user.id),
        ]);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [username, user]);

  const fetchFollowingIds = async (userId: string) => {
    const { data, error } = await supabase
      .from("follows")
      .select("followed_id")
      .eq("follower_id", userId);

    if (error) {
      console.error("フォロー中のユーザーの取得に失敗しました:", error);
    } else if (data) {
      setFollowingIds(data.map((item) => item.followed_id));
    }
  };

  const fetchFollowCounts = async (profileId: string) => {
    // フォロワー数を取得
    const { count: followers } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true })
      .eq("followed_id", profileId);

    setFollowersCount(followers || 0);

    // フォロー中の数を取得
    const { count: following } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true })
      .eq("follower_id", profileId);

    setFollowingCount(following || 0);
  };

  const checkIfFollowing = async (currentUserId: string, profileId: string) => {
    if (currentUserId !== profileId) {
      const { data, error } = await supabase
        .from("follows")
        .select("*")
        .eq("follower_id", currentUserId)
        .eq("followed_id", profileId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("フォロー状態の取得に失敗しました：", error);
      } else {
        setIsFollowing(!!data); // データがあればtrue、なければfalse
      }
    }
  };

  // フォロー中のユーザー一覧を取得する関数
  const fetchFollowingUsers = async () => {
    if (profile) {
      const { data, error } = await supabase.rpc("get_following_profiles", {
        input_follower_id: profile.id,
      });

      if (error) {
        console.error("フォロー中のユーザーの取得に失敗しました：", error);
      } else if (data) {
        // ログインユーザーがフォローしているかを判定
        const updatedData = data.map((user: Profile) => ({
          ...user,
          isFollowing: followingIds.includes(user.id),
        }));
        setFollowingUsers(updatedData);
        setIsFollowingModalOpen(true);
      }
    }
  };

  // フォロワーのユーザー一覧を取得する関数
  const fetchFollowers = async () => {
    if (profile) {
      const { data, error } = await supabase.rpc("get_followers_profiles", {
        input_followed_id: profile.id,
      });

      if (error) {
        console.error("フォロワーの取得に失敗しました：", error);
      } else if (data) {
        // ログインユーザーがフォローしているかを判定
        const updatedData = data.map((user: Profile) => ({
          ...user,
          isFollowing: followingIds.includes(user.id),
        }));
        setFollowers(updatedData);
        setIsFollowersModalOpen(true);
      }
    }
  };

  // フォロー/アンフォローの処理
  const handleFollowToggle = async (userId: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    const isCurrentlyFollowing = followingIds.includes(userId);

    if (isCurrentlyFollowing) {
      // アンフォロー
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("followed_id", userId);

      if (error) {
        console.error("アンフォローに失敗しました：", error);
      } else {
        // `userId`が現在のプロフィールページのユーザーIDと一致する場合のみ`isFollowing`を更新
        if (userId === profile?.id) {
          setIsFollowing(false);
          setFollowersCount(followersCount - 1);
        }
        setFollowingIds(followingIds.filter((id) => id !== userId));

        // フォロー中のユーザーリストを更新
        setFollowingUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, isFollowing: false } : user
          )
        );

        // フォロワーのユーザーリストを更新
        setFollowers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, isFollowing: false } : user
          )
        );
      }
    } else {
      // フォロー
      const { error } = await supabase.from("follows").insert({
        follower_id: user.id,
        followed_id: userId,
      });

      if (error) {
        console.error("フォローに失敗しました：", error);
      } else {
        // フォローしたユーザーをリストに追加
        if (userId === profile?.id) {
          setIsFollowing(true);
          setFollowersCount(followersCount + 1);
        }
        setFollowingIds([...followingIds, userId]);

        // フォロー中のユーザーリストを更新
        setFollowingUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, isFollowing: true } : user
          )
        );

        // フォロワーのユーザーリストを更新
        setFollowers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, isFollowing: true } : user
          )
        );
      }
    }
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
    <>
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
                      onClick={() => handleFollowToggle(profile.id)}
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
                      <span
                        className="text-gray-600 text-sm font-medium group-hover:text-gray-900 cursor-pointer"
                        onClick={fetchFollowingUsers}
                      >
                        フォロー中
                      </span>
                    </p>
                    <p className="flex items-center gap-1 group">
                      <span className="font-semibold">{followersCount}</span>{" "}
                      <span
                        className="text-gray-600 text-sm font-medium group-hover:text-gray-900 cursor-pointer"
                        onClick={fetchFollowers}
                      >
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
                        <span className="tooltiptext">
                          {profile.x_username}
                        </span>
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
            {sortedMangas.length > 0 ? (
              <MangaList
                mangas={sortedMangas}
                isLoading={isLoading}
                limit={100}
              />
            ) : (
              <p className="text-gray-500">
                ブックマークされた漫画はありません
              </p>
            )}
          </div>
        </div>

        {isOwnProfile && (
          <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        <FollowingModal
          isOpen={isFollowingModalOpen}
          onClose={() => setIsFollowingModalOpen(false)}
          followingUsers={followingUsers}
          onFollowToggle={handleFollowToggle}
          followingIds={followingIds}
          currentUserId={user?.id}
        />
        <FollowersModal
          isOpen={isFollowersModalOpen}
          onClose={() => setIsFollowersModalOpen(false)}
          users={followers}
          onFollowToggle={handleFollowToggle}
          followingIds={followingIds}
          currentUserId={user?.id}
        />
      </div>
    </>
  );
}

import Image from "next/image";
import { useEffect, useState } from "react";
import { Manga, Profile } from "../../lib/definitions";
import {
  fetchRecommendedUsers,
  fetchUserBookmarkedMangas,
  getUserBookmarks,
  getUsers,
} from "../../lib/actions";
import { useUser } from "../../context/UserContext";
import { getImageUrl } from "../../lib/data";
import MangaDialog from "../Dialog";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import LoginModal from "../modal/LoginModal";
import UserListSkeleton from "../Skeletons";

export default function UserList() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [userMangas, setUserMangas] = useState<{ [userId: string]: Manga[] }>(
    {}
  );
  const { user: currentUser } = useUser();
  const supabase = createClient();
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ダイアログ関係
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga>();

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();

    // 現在のユーザーがフォローしているユーザーIDを取得
    const fetchFollowing = async () => {
      if (currentUser) {
        const { data, error } = await supabase
          .from("follows")
          .select("followed_id")
          .eq("follower_id", currentUser.id);

        if (error) {
          console.error("フォロー中のユーザーの取得に失敗しました:", error);
        } else {
          setFollowingIds(data.map((item) => item.followed_id));
        }
      }
    };

    fetchFollowing();
  }, [currentUser]);

  const handleFollow = async (followedId: string) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }

    if (followingIds.includes(followedId)) {
      // アンフォロー
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", currentUser.id)
        .eq("followed_id", followedId);

      if (error) {
        console.error("アンフォローに失敗しました:", error);
      } else {
        setFollowingIds(followingIds.filter((id) => id !== followedId));
      }
    } else {
      // フォロー
      const { error } = await supabase.from("follows").insert({
        follower_id: currentUser.id,
        followed_id: followedId,
      });

      if (error) {
        console.error("フォローに失敗しました:", error);
      } else {
        setFollowingIds([...followingIds, followedId]);
      }
    }
  };

  const fetchUsers = async () => {
    const recommendedUsers = currentUser
      ? await fetchRecommendedUsers(currentUser.id)
      : await getUsers();
    setUsers(recommendedUsers);

    const mangasByUser: { [userId: string]: Manga[] } = {};

    await Promise.all(
      recommendedUsers.map(async (user) => {
        const bookmarks = await getUserBookmarks(user.id);
        const mangas = await fetchUserBookmarkedMangas(bookmarks);
        mangasByUser[user.id] = mangas; // 各ユーザーのマンガを最大4件表示
      })
    );

    setUserMangas(mangasByUser);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto py-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
          {[...Array(2)].map((_, index) => (
            <div className="flex flex-col" key={index}>
              <div className="relative flex items-center justify-between space-x-3 rounded-lg bg-transparent pb-5">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-shrink-0">
                  <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 md:gap-2">
                {[...Array(4)].map((_, idx) => (
                  <div
                    className="rounded-md overflow-hidden aspect-[549/780] bg-gray-200 animate-pulse"
                    key={idx}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        {users.map((user) => (
          <div className="flex flex-col" key={user.id}>
            <div className="relative flex items-center justify-between space-x-3 rounded-lg bg-transparent pb-5 focus:outline-none focus:border-none">
              <Link href={`/${user.username}`}>
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 hover:brightness-90 transition">
                    {user.avatar_url && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                        <Image
                          src={user?.avatar_url}
                          alt={`${user.name}のアバター`}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="focus:outline-none focus:border-none">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white md:hover:underline">
                        {user.name}
                      </span>

                      <div className="flex items-center gap-5">
                        <p className="truncate text-xs text-gray-500">
                          ブックマーク {userMangas[user.id]?.length}
                        </p>
                        <div className="px-2 flex-shrink-0">
                          {/* マッチ度を表示 */}
                          {/* <p className="text-xs text-green-600">
                            マッチ度: 98%
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              {/* フォローボタンを追加 */}
              <div className="flex flex-shrink-0">
                <button
                  onClick={() => handleFollow(user.id)}
                  className={`px-4 py-2 text-sm  transition font-bold rounded-md focus:outline-none w-[120px] border ${
                    followingIds.includes(user.id)
                      ? "bg-white text-slate-900 md:hover:bg-slate-100"
                      : "bg-slate-900 text-white md:hover:bg-slate-800"
                  }`}
                >
                  {followingIds.includes(user.id) ? "フォロー中" : "フォロー"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 md:gap-2">
              {userMangas[user.id]?.slice(0, 4).map((manga) => (
                <div
                  className="rounded-md overflow-hidden aspect-[549/780] relative group hover:cursor-pointer border border-slate-50"
                  key={manga.id}
                  onClick={() => openDialog(manga)}
                >
                  <Image
                    src={getImageUrl(manga.folder_group, manga.image_id)}
                    alt={manga.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform transform md:group-hover:scale-105 "
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <MangaDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        manga={selectedManga!}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

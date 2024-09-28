import Image from "next/image";
import { useEffect, useState } from "react";
import { Manga, Profile } from "../lib/definitions";
import {
  fetchRecommendedUsers,
  fetchUserBookmarkedMangas,
  getUserBookmarks,
} from "../lib/actions";
import { useUser } from "../context/UserContext";
import { getImageUrl } from "../lib/data";
import MangaDialog from "./dialog";

export default function UserList() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [userMangas, setUserMangas] = useState<{ [userId: string]: Manga[] }>(
    {}
  );
  const { user: currentUser } = useUser();
  // ダイアログ関係
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga>();
  const [isAnimating, setIsAnimating] = useState(false);

  const openDialog = (manga: Manga) => {
    setSelectedManga(manga);
    setIsOpen(true);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    if (currentUser) {
      const recommendedUsers = await fetchRecommendedUsers(currentUser.id);
      setUsers(recommendedUsers);

      const mangasByUser: { [userId: string]: Manga[] } = {};

      await Promise.all(
        recommendedUsers.map(async (user) => {
          const bookmarks = await getUserBookmarks(user.id);
          const mangas = await fetchUserBookmarkedMangas(bookmarks);
          mangasByUser[user.id] = mangas.slice(0, 4); // 各ユーザーのマンガを最大4件表示
        })
      );

      setUserMangas(mangasByUser);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        {users.map((user) => (
          <div className="flex flex-col" key={user.id}>
            <a
              href="#"
              className="relative flex items-center justify-between space-x-3 rounded-lg bg-transparent pb-5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0 hover:brightness-90 transition">
                  {user.avatar_url && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
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
                  <div className="focus:outline-none">
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    <span className="text-sm font-semibold text-gray-900 dark:text-white md:hover:underline">
                      {user.name}
                    </span>
                    <div className="flex items-center">
                      <p className="truncate text-sm text-gray-500">
                        {user.id}
                      </p>
                      <div className="px-2 flex-shrink-0">
                        {/* マッチ度を表示 */}
                        <p className="text-xs text-green-600">マッチ度: 98%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* フォローボタンを追加 */}
              <div className="flex flex-shrink-0">
                <button className="px-4 py-2 text-sm bg-slate-900 sm:hover:bg-slate-800 transition font-bold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  フォロー
                </button>
              </div>
            </a>

            <div className="grid grid-cols-4 gap-3">
              {userMangas[user.id]?.map((manga) => (
                <div
                  className="rounded-md overflow-hidden aspect-[549/780] relative group hover:cursor-pointer"
                  key={manga.id}
                  onClick={() => openDialog(manga)}
                >
                  <Image
                    src={getImageUrl(manga.image_id)}
                    alt={manga.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform transform md:group-hover:scale-105"
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
        isAnimating={isAnimating}
      />
    </div>
  );
}

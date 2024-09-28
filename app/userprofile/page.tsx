"use client";

import { useBookmark } from "@/app/context/BookmarkContext";
import { useUser } from "@/app/context/UserContext";
import { Manga } from "@/app/lib/definitions";
import { BookOpenIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserBookmarkedMangas } from "../lib/actions";
import MangaList from "../ui/mangaList";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import { ProfileSkeleton } from "../ui/skeletons";
import Spinner from "../ui/spinner";

interface Profile {
  id: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
}

export default function UserProfile() {
  const { user } = useUser();
  const router = useRouter();
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const { bookmarkedMangas } = useBookmark();

  useEffect(() => {
    setIsLoading(true);
    fetchUserBookmarkedMangas(bookmarkedMangas)
      .then((mangaData) => {
        setMangas(mangaData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, [bookmarkedMangas]);

  useEffect(() => {
    // プロフィールデータの取得
    const fetchProfile = async () => {
      setIsProfileLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
      setIsProfileLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleEditClick = () => {
    if (user) {
      // ユーザーが存在する場合、ユーザーIDをパラメーターとして編集ページへリダイレクト
      router.push(`/userprofile/${user.id}/edit`);
    }
  };

  return (
    <div className="container mx-auto py-4 max-w-5xl">
      {isProfileLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="mb-8">
          <div className="py-6">
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                {profile?.avatar_url ? (
                  <div className="w-28 h-28 rounded-full overflow-hidden">
                    <Image
                      src={profile.avatar_url}
                      alt={`${profile?.name}のアバター`}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex-1 md:text-left mb-4">
                  <h1 className="text-xl font-bold">{profile?.name}</h1>
                  <p className="text-gray-500">@otaku_sensei</p>
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
                  <p className="mb-4">
                    アニメとマンガの世界を愛してやまないオタクです。一気読み推奨の作品や、感動したエピソードをいつでも紹介しています！
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-100 md:max-w-sm"
                  onClick={handleEditClick}
                >
                  プロフィールを編集
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-5">
        <div className="py-10">
          <MangaList mangas={mangas} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

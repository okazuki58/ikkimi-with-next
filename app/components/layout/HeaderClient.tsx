"use client";

import { useState, useEffect, useRef } from "react";
import { BookmarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUser } from "../../context/UserContext";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import LoginModal from "@/app/components/modal/LoginModal";
import AlgoSearch from "../AlgoSearch";
// import SearchModal from "../modal/SearchModal";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() => import("../modal/SearchModal"), {
  ssr: false,
});

interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar_url: string;
  bio: string | null;
  created_at: string;
}

export default function ClientHeader({ user }: { user: User | null }) {
  const { signOut } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const [isVisible, setIsVisible] = useState(true);
  const scrollThreshold = 120;
  let lastScrollY = 0;
  let accumulatedDelta = 0; // スクロール量の累積差分

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;

      accumulatedDelta += deltaY;

      if (currentScrollY === 0) {
        setIsVisible(true); // 一番上にスクロールしたときはヘッダーを表示
        accumulatedDelta = 0; // 累積差分をリセット
      } else if (accumulatedDelta > scrollThreshold) {
        setIsVisible(false); // 下にスクロールしているときにヘッダーを隠す
        accumulatedDelta = 0; // 累積差分をリセット
      } else if (accumulatedDelta < -scrollThreshold) {
        setIsVisible(true); // 上にスクロールしているときにヘッダーを表示
        accumulatedDelta = 0; // 累積差分をリセット
      }

      lastScrollY = currentScrollY;
    }
  };

  useEffect(() => {
    // プロフィールデータの取得
    if (user) {
      const fetchProfile = async () => {
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
      };

      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ドロップダウンメニューをクリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target?.closest(".relative")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full transition-transform duration-300 z-10 bg-white ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:divide-y lg:divide-gray-200">
          <div className="relative flex h-16 justify-between">
            <div className="relative z-10 flex px-0">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" passHref className="flex gap-1 items-center">
                  <img src="/frame-1.svg" alt="" className="size-6" />
                  <div className="hidden sm:block font-unbounded text-2xl font-semibold text-gray-900 tracking-wide">
                    Ikkimi
                  </div>
                </Link>
              </div>
            </div>
            <div className="relative z-10 ml-4 flex items-center gap-5">
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={handleOpenSearchModal}
                  className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden md:block">
                <AlgoSearch
                  onCloseModal={() => {}}
                  isOpen={isSearchModalOpen}
                  inputRef={inputRef}
                />
              </div>

              {user && (
                <Link href={`/${profile?.username}`}>
                  <button
                    type="button"
                    className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BookmarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </Link>
              )}

              {/* Profile dropdown */}
              <div className="relative flex-shrink-0">
                {user ? (
                  <>
                    <button
                      onClick={handleMenuToggle}
                      className="relative flex rounded-full bg-white focus:outline-none"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {profile?.avatar_url ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border ">
                          <Image
                            src={profile.avatar_url}
                            alt={`${profile?.name}のアバター`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        <Link
                          key={profile?.username}
                          href={`/${profile?.username}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          プロフィール
                        </Link>
                        <Link
                          key={profile?.username}
                          href={`/${profile?.username}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          設定
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={signOut}
                        >
                          ログアウト
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-md px-3.5 py-2.5 text-sm font-semibold md:hover:bg-secondary focus:outline-none ring-0 transition"
                    >
                      ログイン
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white md:hover:bg-primary-light focus:outline-none ring-0 transition"
                    >
                      無料登録
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          inputRef={inputRef}
        />
      </header>
      <div className="w-full h-16"></div>
    </>
  );
}

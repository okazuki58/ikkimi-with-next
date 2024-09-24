"use client";

import { supabase } from "@/lib/supabaseClient";
import { BookmarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Avatar from "boring-avatars";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useUser } from "../context/UserContext";

const userNavigation = [
  { name: "Your Profile", href: "/home/userprofile" },
  { name: "Settings", href: "#" },
  // { name: "Sign out", href: "#" },
];

export default function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [isVisible, setIsVisible] = useState(true);
  const scrollThreshold = 50;
  let lastScrollY = 0;

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true); // 一番上にスクロールしたときはヘッダーを表示
      } else if (
        currentScrollY > lastScrollY &&
        isVisible &&
        currentScrollY > scrollThreshold
      ) {
        setIsVisible(false); // 下にスクロールしているときにヘッダーを隠す
      } else if (
        currentScrollY < lastScrollY &&
        currentScrollY > scrollThreshold
      ) {
        setIsVisible(true); // 上にスクロールしているときにヘッダーを表示
      }

      lastScrollY = currentScrollY;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("ログアウトに失敗しました:", error.message);
    }
  };

  // プロフィールアイコンのドロップダウンメニューで、画面をクリックした時に閉じるようにする
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".relative")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed left-0 top-0 w-full transition-transform duration-300 z-50 bg-white ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:divide-y lg:divide-gray-200">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-0">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/home" passHref>
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
            </div>
          </div>
          <div className="relative z-10 ml-4 flex items-center gap-5">
            <button
              type="button"
              className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            <Link href="/home/userprofile">
              <button
                type="button"
                className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BookmarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </Link>

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
                    <Avatar name="Alice Paul" variant="beam" size={36} />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Sing out
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ログイン
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

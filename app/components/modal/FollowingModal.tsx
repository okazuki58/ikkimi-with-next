"use client";

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Profile } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "./LoginModal";
interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  followingUsers: Profile[];
  onFollowToggle: (userId: string) => void;
  followingIds: string[];
  currentUserId?: string;
}

export default function FollowingModal({
  isOpen,
  onClose,
  followingUsers,
  onFollowToggle,
  followingIds,
  currentUserId,
}: ModalComponentProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <button
              onClick={() => onClose()}
              className="absolute top-6 right-6 text-gray-400"
            >
              <XMarkIcon className="size-5" />
            </button>
            <div className="flex items-center justify-center p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold">フォロー中のユーザー</h2>
            </div>
            <ul className="flex flex-col gap-3 px-4 py-6">
              {followingUsers.map((user) => {
                const isFollowing = followingIds.includes(user.id);
                return (
                  <li
                    key={user.id}
                    className="mb-2 flex items-center justify-between"
                  >
                    <Link href={`/${user.username}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-50 relative">
                          <Image
                            src={user.avatar_url}
                            alt={`${user.name}のアバター`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {user.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {user.username}
                          </span>
                        </div>
                      </div>
                    </Link>
                    {currentUserId !== user.id && (
                      <button
                        className={`px-2 py-1 text-xs font-bold rounded-md focus:outline-none w-[100px] h-9 border ${
                          isFollowing
                            ? "bg-white text-slate-900 hover:bg-gray-100"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                        onClick={() => {
                          if (!currentUserId) {
                            setIsLoginModalOpen(true);
                          } else {
                            onFollowToggle(user.id);
                          }
                        }}
                      >
                        {isFollowing ? "フォロー中" : "フォロー"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
"use client";

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { fetchBookmarkedUsers } from "@/app/lib/data";
import { Profile } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mangaId: number;
}

export default function BoomarkedUsersModal({
  isOpen,
  onClose,
  mangaId,
}: ModalProps) {
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        const usersData = await fetchBookmarkedUsers(mangaId);
        setUsers(usersData);
      };
      fetchUsers();
    }
  }, [isOpen, mangaId]);

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
              <h2 className="text-xl font-bold">この作品をブックマークしてるユーザー</h2>
            </div>
            <ul className="flex flex-col gap-3 px-4 py-6">
              {users.length === 0 ? (
                <div className="text-gray-500 text-center w-full">
                  この機能は近日公開予定です
                </div>
              ) : (
                users.map((user) => {
                  return (
                    <li
                      key={user.id}
                      className="mb-2 flex items-center justify-between"
                    >
                      <Link href={`/${user.username}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 relative">
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
                              @{user.username}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

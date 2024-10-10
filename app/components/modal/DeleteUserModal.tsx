"use client";

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BlackButton } from "../BlackButton";
import { WhiteButton } from "../WhiteButton";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  onDelete,
}: ModalProps) {
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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-xl font-bold">
                  本当にアカウントを削除しますか？
                </DialogTitle>
                <Description className="text-sm text-gray-600">
                  この操作は取り消せません。アカウントとそれに関連するすべてのデータが永久に削除されます。
                </Description>
              </div>

              <div className="flex gap-4 mt-4 w-full justify-end">
                <div className="space-x-4">
                  <WhiteButton onClick={() => onClose()}>
                    キャンセル
                  </WhiteButton>
                  <BlackButton onClick={() => onDelete()}>削除する</BlackButton>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

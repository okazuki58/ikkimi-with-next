"use client";

import { BlackButton } from "@/app/components/BlackButton";
import DeleteUserModal from "@/app/components/modal/DeleteUserModal";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useDebounce } from "use-debounce";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";
import { useProfile } from "@/app/context/ProfileContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function Settings({ params }: { params: { username: string } }) {
  const { profile } = useProfile();
  const { username } = params;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userAlias, setUserAlias] = useState(username);
  const [debouncedUserAlias] = useDebounce(userAlias, 500);
  const [error, setError] = useState<string | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const { setUser } = useUser();
  const { setProfile } = useProfile();
  const router = useRouter();

  const usernameSchema = z
    .string()
    .min(5, "ユーザー名は5文字以上である必要があります。")
    .max(50, "ユーザー名は50文字以下である必要があります。")
    .regex(
      /[a-zA-Z]/,
      "ユーザー名には少なくとも1文字のアルファベットが含まれている必要があります。"
    );

  useEffect(() => {
    if (debouncedUserAlias === username || debouncedUserAlias === "") {
      setError(null);
      setIsAvailable(null);
      setIsButtonEnabled(false);
      return;
    }

    // Zodを使ったバリデーション
    const result = usernameSchema.safeParse(debouncedUserAlias);
    if (!result.success) {
      setError(result.error.errors[0].message);
      setIsButtonEnabled(false);
      setIsAvailable(null);
      return;
    }

    // バリデーションが成功したら重複チェックを行う
    const checkAvailability = async () => {
      const isAvailable = await checkUsernameAvailability(debouncedUserAlias);
      if (!isAvailable) {
        setError("このユーザー名は既に使用されています。");
        setIsButtonEnabled(false);
        setIsAvailable(false);
      } else {
        setError(null);
        setIsButtonEnabled(debouncedUserAlias !== username);
        setIsAvailable(true);
      }
    };

    checkAvailability();
  }, [debouncedUserAlias, username]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAlias(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (error) {
      console.log("バリデーションエラー:", error);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ username: userAlias })
        .eq("id", profile?.id);

      if (error) {
        console.error("ユーザー名の更新中にエラーが発生しました:", error);
      } else {
        console.log("ユーザー名が更新されました:", data);
        setIsButtonEnabled(false);
        toast.success("ユーザー名が更新されました", {
          className: "bg-indigo-50 text-indigo-600 border border-indigo-400",
        });
        router.push(`/${userAlias}/settings`);
      }
    } catch (error) {
      console.error("ユーザー名の更新中にエラーが発生しました:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: profile?.id }),
      });

      if (!response.ok) {
        throw new Error("アカウント削除に失敗しました。");
      }

      setUser(null);
      setProfile(null);
      console.log("アカウントが削除されました");
      toast.success("アカウントが削除されました", {
        className: "bg-red-50 text-red-600 border border-red-400",
      });
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("アカウント削除中にエラーが発生しました:", error);
      toast.error("アカウント削除に失敗しました。");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const checkUsernameAvailability = async (
    username: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/api/check-username?username=${username}`);
      if (!response.ok) {
        throw new Error("サーバーエラーが発生しました。");
      }
      const data = await response.json();
      return data.isAvailable; // APIが返すデータの構造に応じて修正
    } catch (error) {
      console.error("ユーザー名の確認中にエラーが発生しました:", error);
      return false; // エラーが発生した場合は、ユーザー名が利用できないと仮定
    }
  };

  return (
    <div className="w-full mt-24 flex justify-center items-center">
      <div className="w-full max-w-md mx-auto bg-white border rounded-lg overflow-hidden ">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold mb-1">アカウント設定</h2>
          <p className="text-gray-600 text-sm mb-10">
            アカウント情報の管理と更新
          </p>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ユーザー名
              </label>
              <input
                id="username"
                type="text"
                placeholder="新しいユーザー名"
                value={userAlias}
                onChange={handleUsernameChange}
                className="appearance-none border rounded-md text-sm w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-gray-400"
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              {isAvailable && (
                <p className="text-green-500 text-xs mt-2">利用可能です</p>
              )}
              {/* {isChecking && (
                <p className="text-gray-500 text-xs mt-2">確認中...</p>
              )} */}
            </div>
            <BlackButton
              type="submit"
              className="py-2.5 px-5 w-[160px]"
              disabled={!isButtonEnabled}
            >
              ユーザー名を更新
            </BlackButton>
          </form>
          <div className="flex flex-col gap-2">
            <p className="block text-gray-700 text-sm font-bold">Google認証</p>
            <p className="block text-gray-500 text-sm">{profile?.email}</p>
          </div>
          <div className="mt-14">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-red-500 hover:bg-red-500/90 text-white text-sm font-semibold py-2.5 px-5 rounded-md focus:outline-none focus:shadow-outline w-[160px]"
            >
              アカウントを削除
            </button>
          </div>
        </div>
      </div>
      <DeleteUserModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
}

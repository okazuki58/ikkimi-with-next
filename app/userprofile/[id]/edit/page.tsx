"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/lib/supabaseClient";

export default function EditUserProfile() {
  const { user } = useUser(); // ログインユーザーを取得
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useParams(); // URLパラメータ（id）を取得

  useEffect(() => {
    // ユーザーがログインしていない場合はリダイレクト
    if (!user) {
      router.push("/login");
      return;
    }

    // ログインユーザーの表示名をセット
    setDisplayName("Unkown user");
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return; // ユーザーが存在しない場合は処理しない

    // display_nameの更新
    // try {
    //   const { error } = await supabase.auth.updateUser({
    //     display_name: displayName,
    //   });

    //   if (error) {
    //     console.error("Error updating profile:", error);
    //     setMessage("プロフィールの更新に失敗しました。");
    //   } else {
    //     setMessage("プロフィールが更新されました。");
    //     router.push(`/userprofile/${params.id}`);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   setMessage("予期しないエラーが発生しました。");
    // }
  };

  return (
    <div className="container mx-auto py-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">プロフィールを編集</h2>
      {user ? (
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700"
            >
              Display Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            更新する
          </button>
        </form>
      ) : (
        <p className="text-red-500">
          ログインしていません。ログインしてください。
        </p>
      )}
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}

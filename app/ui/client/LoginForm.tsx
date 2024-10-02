// app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/login";
import Spinner from "../spinner";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setServerError("");

    // 簡単なバリデーション（必要に応じて追加）
    let valid = true;
    if (!email) {
      setEmailError("メールアドレスを入力してください");
      valid = false;
    }
    if (!password) {
      setPasswordError("パスワードを入力してください");
      valid = false;
    }
    if (!valid) return;

    // フォームデータの作成
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        router.push("/?login=success");
        window.location.reload();
      } else {
        setServerError(result.message || "ログインに失敗しました");
      }
    } catch (error) {
      setServerError("サーバーエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto rounded-md ">
      <div className="mb-4">
        <label className="block mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-2.5 py-1.5 border rounded ${
            emailError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {emailError ?? (
          <p className="text-red-500 text-sm mt-1 h-4">{emailError}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-2.5 py-1.5 border rounded ${
            passwordError ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p
          className={`text-red-500 text-sm mt-1 h-4 ${
            passwordError ? "visible" : "invisible"
          }`}
        >
          {passwordError}
        </p>
      </div>

      <button
        type="submit"
        className={`h-10 w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-500 transition ${
          isLoading ? "bg-indigo-200 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? <Spinner /> : "ログイン"}
      </button>

      <div className="mb-4">
        <p
          className={`text-red-500 text-sm h-4 ${
            serverError ? "visible" : "invisible"
          }`}
        >
          {serverError}
        </p>
      </div>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        アカウント登録がまだの方は{" "}
        <Link
          href="/signup"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          こちら
        </Link>
      </p>
    </form>
  );
}

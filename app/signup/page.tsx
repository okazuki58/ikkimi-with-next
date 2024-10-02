import { GoogleButton } from "@/components/googleButton";
import LoginForm from "../ui/client/LoginForm";
import { GithubButton } from "@/components/githubButton";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4 sm:w-[448px] w-full bg-gray-100 rounded-md border my-12 p-6">
      <h2 className="text-2xl font-bold mb-4">アカウント登録</h2>
      <div className="w-full flex flex-col gap-4">
        <GoogleButton />
      </div>
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-gray-100 px-6 text-gray-700">または</span>
        </div>
      </div>
      <button className="flex w-full items-center justify-center rounded-md bg-white px-3 py-4 leading-6 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
        メールアドレス
      </button>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        すでにアカウントをお持ちですか？{" "}
        <Link
          href="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          ログイン
        </Link>
      </p>
    </div>
  );
}

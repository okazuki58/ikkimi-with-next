import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 text-center my-24">
      <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
      <p className="text-lg font-semibold text-gray-600 px-10">
        このページはすでに削除されているか、URLが間違っている可能性があります。
      </p>
      <Link href="/">
        <button className="mt-4 font-semibold text-gray-500 bg-secondary border border-gray-300 px-4 py-2 rounded-full md:hover:bg-[#e4e4f5] transition">
          ホームに戻る
        </button>
      </Link>
    </div>
  );
}

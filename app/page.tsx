import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href="/home">
        <button
          type="button"
          className="rounded bg-indigo-600 px-5 py-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
}

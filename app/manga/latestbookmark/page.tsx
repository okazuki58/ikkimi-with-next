import LatestBookmarks from "./clientLatestBookmark";

export default function Page() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="py-10">
        <h1 className="text-3xl font-bold">最新のブックマーク</h1>
      </div>
      <div className="py-4">
        <LatestBookmarks />
      </div>
    </div>
  );
}

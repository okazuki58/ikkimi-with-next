import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { useBookmark } from "../context/BookmarkContext";
import { toast } from "sonner";

interface BookmarkButtonProps {
  mangaId: number;
  bookmark: number;
}

export default function BookmarkButton({
  mangaId,
  bookmark,
}: BookmarkButtonProps) {
  const { bookmarkedMangas, animatingMangas, toggleBookmark } = useBookmark();

  const handleClick = () => {
    toggleBookmark(mangaId);
    const message = bookmarkedMangas.includes(mangaId)
      ? "ブックマークを解除しました"
      : "ブックマークを追加しました";
    toast.success(message);
  };

  return (
    <>
      <div
        className="flex items-center cursor-pointer group"
        onClick={handleClick}
      >
        {bookmarkedMangas.includes(mangaId) ? (
          <BookmarkSolid
            className={`size-4 transition-transform transform ${
              animatingMangas.includes(mangaId)
                ? "animate-smoothBounce text-slate-600"
                : "text-slate-600"
            }`}
          />
        ) : (
          <BookmarkOutline
            className={`size-4 transition-transform transform group-hover:text-slate-600 ${
              animatingMangas.includes(mangaId)
                ? "animate-smoothBounce text-slate-400"
                : "text-slate-400"
            }`}
          />
        )}
        <span className="text-sm ml-1 text-gray-500 group-hover:text-slate-600">
          {(
            bookmark + (bookmarkedMangas.includes(mangaId) ? 1 : 0)
          ).toLocaleString()}
        </span>
      </div>
    </>
  );
}

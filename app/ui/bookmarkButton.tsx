import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { useBookmark } from "../context/BookmarkContext";
import { toast, Slide } from "react-toastify";

interface BookmarkButtonProps {
  mangaId: number;
  likes: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ mangaId, likes }) => {
  const { bookmarkedMangas, animatingMangas, toggleBookmark } = useBookmark();

  const handleClick = () => {
    toggleBookmark(mangaId);
    const message = bookmarkedMangas.includes(mangaId)
      ? "ブックマークを解除しました"
      : "ブックマークを追加しました";
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: "",
      theme: "dark",
      transition: Slide,
    });
  };

  return (
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
          likes + (bookmarkedMangas.includes(mangaId) ? 1 : 0)
        ).toLocaleString()}
      </span>
    </div>
  );
};

export default BookmarkButton;

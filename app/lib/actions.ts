import { supabase } from "@/utils/supabaseClient";
import { Manga } from "./definitions";


export async function saveBookmark(
  userId: string | undefined,
  mangaId: number
): Promise<void> {
  if (userId) {
    // ユーザーがログインしている場合、データベースに保存
    const { error } = await supabase
      .from("user_bookmarks")
      .insert({ user_id: userId, manga_id: mangaId });

    if (error) {
      console.error("ブックマークの保存に失敗しました:", error.message);
    } else {
      const { error: updateError } = await supabase.rpc("increment_bookmark", {
        manga_id: mangaId,
      });

      if (updateError) {
        console.error(
          "mangaテーブルの更新に失敗しました:",
          updateError.message
        );
        console.error("詳細なエラー情報:", updateError);
      }
    }
  } else {
    // ログインしていない場合、キャッシュに保存
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (!bookmarks.includes(mangaId)) {
      bookmarks.push(mangaId);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }
}

export async function deleteBookmark(
  userId: string | undefined,
  mangaId: number
): Promise<void> {
  if (userId) {
    // ユーザーがログインしている場合、データベースから削除
    const { error } = await supabase
      .from("user_bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("manga_id", mangaId);

    if (error) {
      console.error("ブックマークの削除に失敗しました:", error.message);
    } else {
      const { error: updateError } = await supabase.rpc("decrement_bookmark", {
        manga_id: mangaId,
      });

      if (updateError) {
        console.error(
          "mangaテーブルの更新に失敗しました:",
          updateError.message
        );
        console.error("詳細なエラー情報:", updateError);
      } else {
        console.log("decrement_bookmarkは正常に動作しました");
      }
    }
  } else {
    // ログインしていない場合、キャッシュから削除
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    bookmarks = bookmarks.filter((id: number) => id !== mangaId);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

export async function getUserBookmarks(userId: string): Promise<number[]> {
  try {
    const { data, error } = await supabase
      .from("user_bookmarks")
      .select("manga_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Failed to get user bookmarks:", error);
      return [];
    }

    return data ? data.map((row) => row.manga_id) : [];
  } catch (error) {
    console.error("Failed to get user bookmarks:", error);
    return [];
  }
}

export async function fetchUserBookmarkedMangas(
  mangaIds: number[]
): Promise<Manga[]> {
  if (!mangaIds || mangaIds.length === 0) {
    return [];
  }

  // manga_id を使用して manga データを取得
  const { data: mangasData, error: mangasError } = await supabase
    .from("manga")
    .select("*")
    .in("id", mangaIds);

  if (mangasError || !mangasData) {
    console.error("漫画データの取得に失敗しました:", mangasError);
    return [];
  }

  return mangasData as Manga[];
}

// 全てのブックマーク数を取得する関数
export async function getBookmarkCounts(): Promise<{ [mangaId: number]: number }> {
  try {
    const { data, error } = await supabase
      .from("manga")
      .select("id, bookmark");

    if (error) {
      console.error("Failed to get bookmark counts:", error);
      return {};
    }

    const counts: { [mangaId: number]: number } = {};
    data?.forEach((manga: any) => {
      counts[manga.id] = manga.bookmark;
    });

    return counts;
  } catch (error) {
    console.error("Failed to get bookmark counts:", error);
    return {};
  }
}

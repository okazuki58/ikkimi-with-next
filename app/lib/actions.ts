import { supabase } from "@/lib/supabaseClient";

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
      console.error("詳細なエラー情報:", error);
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

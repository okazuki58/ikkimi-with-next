import { supabase } from "@/utils/supabaseClient";
import { Manga, Profile } from "./definitions";

export async function saveBookmark(
  userId: string | undefined,
  mangaId: number
): Promise<void> {
  if (!userId) return;

  const { data, error } = await supabase.rpc("add_bookmark", {
    p_user_id: userId,
    p_manga_id: mangaId,
  });

  // if (error) {
  //   console.error("RPCエラー:", error);
  // } else {
  //   console.log("RPC成功:", data);
  // }
}

export async function deleteBookmark(
  userId: string | undefined,
  mangaId: number
): Promise<void> {
  if (!userId) return;

  const { data, error } = await supabase.rpc("remove_bookmark", {
    p_user_id: userId,
    p_manga_id: mangaId,
  });

  // if (error) {
  //   console.error("RPCエラー:", error);
  // } else {
  //   console.log("RPC成功:", data);
  // }
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
export async function getBookmarkCounts(): Promise<{
  [mangaId: string]: number;
}> {
  try {
    const { data, error } = await supabase
      .from("manga")
      .select("id, bookmark")
      .order("id", { ascending: true });

    if (error) {
      console.error("Failed to get bookmark counts:", error);
      return {};
    }

    const counts: { [mangaId: string]: number } = {};
    data?.forEach((manga: any) => {
      counts[manga.id.toString()] = manga.bookmark;
    });

    return counts;
  } catch (error) {
    console.error("Failed to get bookmark counts:", error);
    return {};
  }
}

// おすすめのユーザーを取得する関数
export async function fetchRecommendedUsers(
  currentUserId: string
): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", currentUserId)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Failed to fetch recommended users:", error.message);
    return [];
  }

  return data as Profile[];
}

import { supabase } from "@/utils/supabaseClient";
import { Manga } from "./definitions";

// ユーザーがブックマークした漫画のジャンルを取得
export async function getUserPreferredGenres(
  userId: string
): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_bookmarks")
    .select("manga(genres)")
    .eq("user_id", userId);

  if (error) {
    console.error("ユーザーのブックマーク取得エラー:", error);
    return [];
  }

  const genres = data.flatMap((bookmark: any) => bookmark.manga.genres);
  const uniqueGenres = Array.from(new Set(genres));

  return uniqueGenres;
}

// おすすめの漫画を取得
export async function getRecommendedMangas(userId: string): Promise<Manga[]> {
  // ユーザーのブックマークした漫画IDを取得
  const { data: bookmarkedData } = await supabase
    .from("user_bookmarks")
    .select("manga_id")
    .eq("user_id", userId);

  const bookmarkedIds = bookmarkedData?.map((bm: any) => bm.manga_id);

  // ユーザーの好みのジャンルを取得
  const preferredGenres = await getUserPreferredGenres(userId);
  console.log(preferredGenres);

  // 未ブックマークかつ好みのジャンルの漫画を取得
  const { data: recommendedMangas, error } = await supabase
    .from("manga")
    .select("*")
    .overlaps("genres", preferredGenres)
    .not("id", "in", `(${bookmarkedIds?.join(",")})`)
    .gte("bookmark", 100)
    .lte("bookmark", 900)
    .limit(14);

  if (error) {
    console.error("おすすめ漫画の取得エラー:", error);
    return [];
  }

  return recommendedMangas as Manga[];
}

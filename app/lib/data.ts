import { createClient } from "@/utils/supabase/client";
import { Manga } from "./definitions";

const supabase = createClient();

// 漫画一覧
export async function fetchMangaList() {
  try {
    const { data, error } = await supabase
      .from("manga")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw new Error("Failed to fetch manga data.");
    }

    return data;
  } catch (error) {
    throw new Error("Failed to fetch manga data.");
  }
}

// 画像
export function getImageUrl(image_id: string): string {
  const { data } = supabase.storage
    .from("ikkimi-image")
    .getPublicUrl(`${image_id}.webp`);

  return data.publicUrl;
}

// ランキング
export async function fetchRankingMangas(limit = 12): Promise<Manga[]> {
  const { data, error } = await supabase
    .from("manga")
    .select("*")
    .order("likes", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("ランキングデータの取得に失敗しました:", error);
    return [];
  }

  return data as Manga[];
}

// 急上昇
export const fetchRisingManga = async (): Promise<Manga[]> => {
  const timeLimit = new Date(Date.now() - 3600 * 1000).toISOString(); // 直近1時間
  const { data, error } = await supabase.rpc("get_rising_manga", {
    time_limit: timeLimit,
  });

  if (error) {
    console.error("Error fetching rising manga:", error);
    return [];
  }

  return data as Manga[];
};

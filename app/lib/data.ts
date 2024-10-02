import { createClient } from "@/utils/supabase/client";
import { Manga, Profile } from "./definitions";

const supabase = createClient();

// idから漫画を取得
export async function getMangaById(manga_id: string): Promise<Manga> {
  const { data, error } = await supabase
    .from("manga")
    .select("*")
    .eq("id", manga_id);
  return data?.[0] as Manga;
}

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
export function getImageUrl(folder_group: string, image_id: string): string {
  const { data } = supabase.storage
    .from("ikkimi-image")
    .getPublicUrl(`${folder_group}/${image_id}.webp`);

  return data.publicUrl;
}

// ユーザー画像
export function getAvatarUrl(profileId: string, fileName: string): string {
  const { data } = supabase.storage
    .from("avatars") // avatars バケット
    .getPublicUrl(`${profileId}/${fileName}`); // profile.id を使ってパスを指定

  return data.publicUrl || "";
}

export async function fetchUserProfileByUsername(
  username: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.error("ユーザープロフィールの取得に失敗しました:", error);
    return null;
  }

  return data as Profile;
}

// ブックマーク情報を取得する関数
export async function fetchUserBookmarksWithDate(userId: string | undefined) {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("user_bookmarks")
    .select("manga_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // ブックマーク日時の降順

  if (error) {
    console.error("ブックマーク情報の取得に失敗しました:", error);
    return [];
  }

  return data;
}

export interface MangaWithBookmarkDate extends Manga {
  bookmarkCreatedAt: string;
}

// ブックマークした漫画を取得
export async function fetchUserBookmarkedMangasWithCreatedAt(
  userId: string | undefined
): Promise<MangaWithBookmarkDate[]> {
  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("user_bookmarks")
    .select("manga_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (bookmarksError || !bookmarksData) {
    console.error(
      "ユーザーのブックマーク情報の取得に失敗しました:",
      bookmarksError
    );
    return [];
  }

  const mangaIds = bookmarksData.map((bookmark) => bookmark.manga_id);

  if (mangaIds.length === 0) {
    return [];
  }

  // 漫画情報を取得
  const { data: mangasData, error: mangasError } = await supabase
    .from("manga")
    .select("*")
    .in("id", mangaIds);

  if (mangasError || !mangasData) {
    console.error("漫画情報の取得に失敗しました:", mangasError);
    return [];
  }
  // manga_id をキーとするマップを作成
  const mangaMap = new Map<number, Manga>();
  mangasData.forEach((manga) => {
    mangaMap.set(manga.id, manga);
  });

  // ブックマーク順に漫画リストを作成
  const mangas: MangaWithBookmarkDate[] = bookmarksData
    .map((bookmark) => {
      const manga = mangaMap.get(bookmark.manga_id);
      if (manga) {
        return {
          ...manga,
          bookmarkCreatedAt: bookmark.created_at,
        };
      }
      return null;
    })
    .filter((manga): manga is MangaWithBookmarkDate => manga !== null);

  return mangas;
}

// ランキング
export async function fetchRankingMangas(limit = 100): Promise<Manga[]> {
  const { data, error } = await supabase
    .from("manga")
    .select("*")
    .order("bookmark", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("ランキングデータの取得に失敗しました:", error);
    return [];
  }

  return data as Manga[];
}

// 急上昇
export const fetchRisingManga = async (): Promise<Manga[]> => {
  // const timeLimit = new Date(Date.now() - 3600 * 1000).toISOString(); // 直近1時間
  const timeLimit = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(); // 直近7日間
  const { data, error } = await supabase.rpc("fetch_recent_bookmarks", {
    time_limit: timeLimit,
  });

  if (error) {
    console.error("Error fetching rising manga:", error);
    return [];
  }

  return data as Manga[];
};

// リレーションを使用してmanga_to_mediaに関連するmangaを取得
export async function fetchMangasWithMedia(): Promise<Manga[]> {
  const { data, error } = await supabase
    .from("manga")
    .select("*, manga_to_media!inner(*)");

  if (error) {
    console.error("データの取得に失敗しました:", error);
    return [];
  }

  // manga_to_mediaが存在するmangaを抽出
  const mangasWithMedia = data as Manga[];

  return mangasWithMedia;
}

// リレーションを使用してawardsに関連するmangaを取得
export async function fetchMangasWithAwards(): Promise<Manga[]> {
  const { data, error } = await supabase
    .from("manga")
    .select("*, awards!inner(*)");

  if (error) {
    console.error("データの取得に失敗しました:", error);
    return [];
  }

  // manga_to_mediaが存在するmangaを抽出
  const mangasWithAwards = data as Manga[];

  return mangasWithAwards;
}

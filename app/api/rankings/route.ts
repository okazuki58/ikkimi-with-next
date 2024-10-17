// app/api/rankings/route.ts
import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const allowedCategories = [
    "総合",
    "少年",
    "少女",
    "青年",
    "女性",
    "BL",
    "TL",
    "アクション",
    "グルメ",
    "スポーツ",
    "ドラマ",
    "ファンタジー",
    "ホラー・ミステリー",
    "恋愛",
    "日常",
    "裏社会・アングラ",
  ];
  const category = allowedCategories.includes(
    searchParams.get("category") as string
  )
    ? (searchParams.get("category") as string)
    : "総合";

  const { data, error } = await supabase
    .from("genre_rankings")
    .select("manga_id, bookmark_count")
    .eq("genre", category)
    .order("bookmark_count", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mangaIds = data.map((item) => item.manga_id);

  const { data: mangaDetails, error: mangaError } = await supabase
    .from("manga")
    .select("*")
    .in("id", mangaIds)
    .order("bookmark", { ascending: false });

  if (mangaError) {
    return NextResponse.json({ error: mangaError.message }, { status: 500 });
  }

  return NextResponse.json(mangaDetails);
}

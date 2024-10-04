import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();

  // リクエストからJSONデータを取得
  const { follower_id, followed_id } = await request.json();

  // フォロー情報を挿入
  const { error } = await supabase
    .from("follows")
    .insert({ follower_id, followed_id });

  if (error) {
    console.error("フォローに失敗しました:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "フォローしました" }, { status: 200 });
}

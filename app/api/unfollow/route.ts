import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();

  // リクエストからJSONデータを取得
  const { follower_id, followed_id } = await request.json();

  // フォロー情報を削除
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", follower_id)
    .eq("following_id", followed_id);

  if (error) {
    console.error("アンフォローに失敗しました:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "フォローを解除しました" }, { status: 200 });
}

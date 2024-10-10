import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "ユーザー名が指定されていません。" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("profiles") 
      .select("username")
      .eq("username", username);

    if (error) {
      console.error("Supabaseエラー:", error);
      return NextResponse.json(
        { error: "サーバーエラーが発生しました。" },
        { status: 500 }
      );
    }

    // データが存在しない場合は利用可能
    const isAvailable = data.length === 0;
    return NextResponse.json({ isAvailable });
  } catch (error) {
    console.error("ユーザー名の確認中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}

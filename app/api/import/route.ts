import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "app/data/updated_output.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const { data, error } = await supabase
    .from("manga") // テーブル名
    .insert(jsonData); // JSONデータを挿入

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import fs from "fs";
import path from "path";

export async function GET() {
  const dataDir = path.join(process.cwd(), "app/data");
  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const { data, error } = await supabase
      .from("manga") // テーブル名
      .insert(jsonData); // JSONデータを挿入

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json(
    { message: "All files processed successfully" },
    { status: 200 }
  );
}

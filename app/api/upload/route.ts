import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/utils/supabaseClient";

export async function GET() {
  // アップロード対象のディレクトリ
  const baseDir = path.join(process.cwd(), "app/images");

  // 再帰的にディレクトリ内のwebpファイルを探索する関数
  const getWebpFiles = (dir: string, fileList: string[] = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // ディレクトリ内を再帰的に探索
        getWebpFiles(filePath, fileList);
      } else if (path.extname(file) === ".webp") {
        // .webpファイルのみをリストに追加
        fileList.push(filePath);
      }
    });

    return fileList;
  };

  // すべてのwebpファイルを取得
  const webpFiles = getWebpFiles(baseDir);

  // 非同期で並行してファイルをアップロード
  const uploadPromises = webpFiles.map(async (file) => {
    const fileBuffer = fs.readFileSync(file);
    const fileName = path.relative(baseDir, file); // サブディレクトリを含めた相対パス

    // Supabaseにファイルをアップロード
    return supabase.storage
      .from("ikkimi-image")
      .upload(`${fileName}`, fileBuffer);
  });

  // すべてのアップロードが完了するまで待つ
  await Promise.all(uploadPromises);

  return NextResponse.json({ message: "All webp files uploaded successfully" });
}

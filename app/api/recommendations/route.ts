import { NextResponse } from "next/server";
import algoliasearch from "algoliasearch";
import { getMangasByTitles } from "@/app/lib/data";

const applicationID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const adminAPIKey = process.env.ALGOLIA_ADMIN_API_KEY!;
const indexName = "manga_index";

export async function GET() {
  // 今日の日付を取得 (YYYY-MM-DD形式)
  const today = new Date().toISOString().split("T")[0];

  // Algolia Analytics APIエンドポイント
  const url = `https://analytics.algolia.com/2/searches`;

  try {
    const response = await fetch(
      `${url}?index=${indexName}&startDate=${today}&endDate=${today}&limit=10`,
      {
        headers: {
          "X-Algolia-API-Key": adminAPIKey,
          "X-Algolia-Application-Id": applicationID,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching analytics data: ${response.statusText}`);
    }

    const data = await response.json();

    // 検索クエリを抽出
    const queries = data.searches.map((search: any) => search.query);

    // クエリから漫画データを取得
    const mangas = await getMangasByTitles(queries);

    return NextResponse.json({ mangas });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.error();
  }
}

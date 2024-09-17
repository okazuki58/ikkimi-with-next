import { sql } from "@vercel/postgres";
import { Manga } from "./definitions";

export async function fetchMangaList() {
  try {
    const data = await sql<Manga>`SELECT * FROM mangadatas`;

    return data.rows;
  } catch (error) {
    throw new Error("Failed to fetch manga data.");
  }
}

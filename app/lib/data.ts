// import { sql } from "@vercel/postgres";
// import { Manga } from "./definitions";

// export async function fetchMangaList() {
//   try {
//     const data =
//       await sql<Manga>`SELECT * FROM mangadatas ORDER BY id ASC LIMIT 12`;
//     return data.rows;
//   } catch (error) {
//     throw new Error("Failed to fetch manga data.");
//   }
// }

import { supabase } from "@/lib/supabaseClient";

export async function fetchMangaList() {
  try {
    const { data, error } = await supabase
      .from("manga")
      .select("*")
      .order("id", { ascending: true })
      .limit(12);

    if (error) {
      throw new Error("Failed to fetch manga data.");
    }

    return data;
  } catch (error) {
    throw new Error("Failed to fetch manga data.");
  }
}

export function getImageUrl(image_id: string): string {
  const { data } = supabase
    .storage
    .from('ikkimi-image')
    .getPublicUrl(`${image_id}.webp`);

  return data.publicUrl;
}

import { UserLike } from "./definitions";
import { sql } from "@vercel/postgres";

export async function addLike(
  userId: string,
  mangaId: number
): Promise<UserLike | null> {
  try {
    await sql`
      INSERT INTO user_likes (user_id, manga_id)
      VALUES (${userId}, ${mangaId})
    `;
    await sql`
      UPDATE mangadatas
      SET likes = likes + 1
      WHERE id = ${mangaId}
    `;
    return { id: 0, user_id: userId, manga_id: mangaId };
  } catch (error) {
    console.error("Failed to add like:", error);
    return null;
  }
}

export async function removeLike(
  userId: string,
  mangaId: number
): Promise<boolean> {
  try {
    const deleteResult = await sql`
      DELETE FROM user_likes
      WHERE user_id = ${userId} AND manga_id = ${mangaId}
    `;
    if (deleteResult.rowCount > 0) {
      await sql`
        UPDATE mangadatas
        SET likes = likes - 1
        WHERE id = ${mangaId}
      `;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to remove like:", error);
    return false;
  }
}

export async function getUserLikes(userId: string): Promise<number[]> {
  try {
    const result = await sql`
      SELECT manga_id FROM user_likes
      WHERE user_id = ${userId}
    `;
    return result.rows.map((row) => row.manga_id);
  } catch (error) {
    console.error("Failed to get user likes:", error);
    return [];
  }
}

import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { mangadatas } from "../lib/placeholder-data";

const client = await db.connect();

async function seedMangaDatas() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    DROP TABLE IF EXISTS mangadatas;
    CREATE TABLE mangadatas (
      id INTEGER PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      cover_url VARCHAR(255) NOT NULL,
      description TEXT,
      likes INTEGER
    )
  `;

  const insertedMangaDatas = await Promise.all(
    mangadatas.map(
      (mangadata) => client.sql`
        INSERT INTO mangadatas (id, title, cover_url, description, likes)
        VALUES (${mangadata.id},${mangadata.title},${mangadata.cover_url},${mangadata.description},${mangadata.likes})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedMangaDatas;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedMangaDatas();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { mangadatas, users, userlikes } from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

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

async function seedUserLikes() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    DROP TABLE IF EXISTS user_likes;
    CREATE TABLE user_likes (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      manga_id INTEGER NOT NULL
    )
  `;

  const insertUserLikes = await Promise.all(
    userlikes.map(
      (userlike) => client.sql`
        INSERT INTO user_likes (user_id, manga_id)
        VALUES (${userlike.user_id},${userlike.manga_id})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertUserLikes;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedMangaDatas();
    await seedUserLikes();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

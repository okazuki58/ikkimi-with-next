import { fetchMangaList } from "../lib/data";
import MangaList from "../ui/mangaList";

export const revalidate = 0; // キャッシュを無効化

export default async function ContentHome() {
  const mangas = await fetchMangaList();

  return (
    <div className="container mx-auto max-w-5xl w-full flex flex-col gap-5 py-5">
      <MangaList mangas={mangas} sectionTitle="Top Manga Rankings" />
      <MangaList mangas={mangas} sectionTitle="Trending" />
      <MangaList mangas={mangas} sectionTitle="Your Friends Are Reading" />
    </div>
  );
}

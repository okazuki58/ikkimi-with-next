import MangaDetail from "@/app/components/manga/MangaDetails";
import { getMangaById } from "@/app/lib/data";

interface PageProps {
  params: {
    manga_id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { manga_id } = params;
  const manga = await getMangaById(manga_id);

  return (
    <div className="mb-4 min-w-full">
      <MangaDetail manga={manga} />
    </div>
  );
};

export default Page;

import MangaDetail from "@/app/components/manga/MangaDetails";
import { getMangaById } from "@/app/lib/data";
import NotFound from "@/app/not-found";

interface PageProps {
  params: {
    manga_id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { manga_id } = params;
  const manga = await getMangaById(manga_id);

  if (!manga) {
    return <NotFound />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="py-10">
        <h1 className="text-3xl font-bold">検索結果</h1>
      </div>
      <div className="py-4">
        <MangaDetail manga={manga} />
      </div>
    </div>
  );
};

export default Page;

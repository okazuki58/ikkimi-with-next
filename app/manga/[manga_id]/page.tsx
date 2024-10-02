import { getMangaById } from "@/app/lib/data";
import { MangaListHeader } from "@/app/ui/listHeader";
import MangaList from "@/app/ui/mangaList";

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
      <div className="py-16">
        <MangaListHeader
          sectionTitle="検索結果"
          subSectionTitle="Ranking"
          buttonText=""
        />
        <MangaList mangas={[manga]} isLoading={false} />
      </div>
    </div>
  );
};

export default Page;

"use client";

import { useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { Manga } from "@/app/lib/definitions";
import { supabase } from "@/utils/supabaseClient";
import { MangaListHeader } from "@/app/ui/listHeader";
import MangaList from "@/app/ui/mangaList";

interface MangaDetailProps {
  manga: Manga;
}

const MangaDetail = ({ manga }: MangaDetailProps) => {
  const { user } = useUser();

  // 閲覧情報を記録する関数
  const logMangaView = async () => {
    const { error } = await supabase.from("manga_views").insert({
      manga_id: manga.id,
      user_id: user ? user.id : null,
    });

    if (error) {
      console.error("閲覧情報の記録に失敗しました:", error);
    }
  };

  useEffect(() => {
    logMangaView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manga.id]);

  return (
    <div className="py-16">
      <MangaListHeader sectionTitle="検索結果" buttonText="" />
      <MangaList mangas={[manga]} isLoading={false} />
    </div>
  );
};

export default MangaDetail;

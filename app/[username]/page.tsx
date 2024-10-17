import { fetchUserProfileByUsername } from "../lib/data";
import NotFound from "../not-found";
import ProfilePageContent from "./ProfilePageContent";
import { Metadata } from "next";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = params;

  // プロフィール情報を取得
  const profile = await fetchUserProfileByUsername(username);

  if (!profile) {
    return {
      title: "ユーザーが見つかりません",
    };
  }

  const title = `${profile.name}のマンガ本棚`;
  const url = `https://ikki-mi.com/${username}`;
  const image = profile.avatar_url;

  return {
    title,
    openGraph: {
      title,
      url,
      images: [
        {
          url: image,
          alt: `${profile.name}のアバター`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      images: [image],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;

  // プロフィール情報を取得
  const profile = await fetchUserProfileByUsername(username);

  if (!profile) {
    return <NotFound />;
  }

  return <ProfilePageContent params={params} />;
}

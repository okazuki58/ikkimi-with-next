export type Manga = {
  id: number;
  title: string;
  authors: string[];
  publisher: string;
  genres: string[];
  description: string;
  likes: number;
  status: string;
  image_url: string;
  image_id: string;
  bookmark: number;
  folder_group: string;
  amazon_url: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Profile = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar_url: string;
  bio: string | null;
  created_at: string;
};

export type UserLike = {
  id: number;
  user_id: string;
  manga_id: number;
};

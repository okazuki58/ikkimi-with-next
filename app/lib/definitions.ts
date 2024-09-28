export type Manga = {
  id: number;
  title: string;
  authors: string[];
  publisher: string;
  genres: string[];
  description: string;
  likes: string;
  status: string;
  image_url: string;
  image_id: string;
  bookmark: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserLike = {
  id: number;
  user_id: string;
  manga_id: number;
};

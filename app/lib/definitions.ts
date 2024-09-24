export type Manga = {
  id: number;
  title: string;
  authors: string[];
  publisher: string;
  genres: string[];
  description: string;
  image_url: string;
  image_id: string;
  amazon_url: string;
  bookmark: number;
};

export type NewManga = {
  id: number;
  title: string;
  authors: string[];
  publisher: string;
  genres: string[];
  description: string;
  image_file: string;
  image_url: string;
  amazon_url: string;
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

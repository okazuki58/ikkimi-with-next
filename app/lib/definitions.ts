export type Manga = {
  id: number;
  title: string;
  cover_url: string;
  description: string;
  likes: number;
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

import { User } from "./user-response";

export interface Comment {
  id: string;
  user: User;
  body: string;
  created_at: string;
  updated_at: string;
}
export interface Like {
  id: string;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface Img {
  id: string;
  src: string;
  imgType: string;
  created_at: string;
  updated_at: string;
}
interface PostImg {
  id: string;
  img: Img;
}
export interface Post {
  created_at: string;
  description: string;
  id: string;
  post_imgs: PostImg[];
  updated_at: string;
  comments: Comment[];
  likes: Like[];
  user: User;
}

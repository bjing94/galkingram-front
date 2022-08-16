import Comment from "./comment-response";
import Img from "./img-response";
import Like from "./like-response";
import { User } from "./user-response";

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

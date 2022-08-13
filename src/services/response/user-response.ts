import BookmarkResponse from "./bookmark-response";
import Like from "./like-response";

export interface User {
  id: string;
  username: string;
  fullName: string;
  likes: Like[];
  bookmarks: BookmarkResponse[];
  email?: string;
  created_at: string;
}

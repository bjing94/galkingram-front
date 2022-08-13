import { User } from "./user-response";

export default interface Comment {
  id: string;
  user: User;
  body: string;
  created_at: string;
  updated_at: string;
}

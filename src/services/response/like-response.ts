import { User } from "./user-response";

export default interface Like {
  id: string;
  user: User;
  created_at: string;
  updated_at: string;
}

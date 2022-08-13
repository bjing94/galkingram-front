import { makeAutoObservable } from "mobx";
import { CheckAuth, GetProfile, Login } from "../services/AuthService";
import LoginDto from "../services/dto/login.dto";
import BookmarkResponse from "../services/response/bookmark-response";
import Like from "../services/response/like-response";

class AuthStore {
  auth: boolean = false;
  id: string = "";
  username: string = "";
  email: string = "";
  createdAt: Date = new Date();
  bookmarks: BookmarkResponse[] = [];
  likes: Like[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(value: boolean) {
    this.auth = value;
  }

  authenticate(dto: LoginDto) {
    Login(dto)
      .then(() => {
        this.auth = true;
        this.getProfile();
      })
      .catch((err) => {
        this.auth = false;
      });
  }

  getProfile() {
    GetProfile().then((response) => {
      const user = response.data;
      this.username = user.username;
      this.email = user.email ?? "";
      this.createdAt = new Date(user.created_at);
      this.id = user.id;
      this.bookmarks = user.bookmarks;
      this.likes = user.likes;
    });
  }

  getBookmarks() {
    return this.bookmarks;
  }

  checkAuthentication() {
    CheckAuth().then(({ data }) => {
      this.auth = data.auth;
      if (data.auth) this.getProfile();
    });
  }
}

export default new AuthStore();

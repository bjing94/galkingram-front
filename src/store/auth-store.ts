import { makeAutoObservable } from "mobx";
import { CheckAuth, GetProfile, Login } from "../services/AuthService";
import LoginDto from "../services/dto/login.dto";

class AuthStore {
  auth: boolean = false;
  id: string = "";
  username: string = "";
  email: string = "";
  createdAt: Date = new Date();

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
      this.email = user.email;
      this.createdAt = new Date(user.createdAt);
      this.id = user.id;
    });
  }

  checkAuthentication() {
    CheckAuth().then(({ data }) => {
      this.auth = data.auth;
      if (data.auth) this.getProfile();
    });
  }
}

export default new AuthStore();

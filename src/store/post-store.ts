import { makeAutoObservable } from "mobx";
import { getPosts } from "../services/PostService";
import { Post } from "../services/response/post-response";

class PostStore {
  posts: Post[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchPosts() {
    getPosts().then((response) => {
      this.posts = response.data;
      console.log(response.data);
    });
  }
}

export default new PostStore();

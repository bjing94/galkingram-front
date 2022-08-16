import { makeAutoObservable } from "mobx";
import { getPosts } from "../services/PostService";
import { Post } from "../services/response/post-response";

class PostStore {
  posts: Post[] = [];
  activePost: Post | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  fetchPosts() {
    getPosts().then((response) => {
      this.posts = response.data;
      console.log(response.data);
    });
  }

  setActivePost(post: Post | null) {
    this.activePost = post;
  }
}

export default new PostStore();

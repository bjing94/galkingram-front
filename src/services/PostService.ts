import axios, { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import UpdatePostDto from "./dto/update-post.dto";
import { Post } from "./response/post-response";

const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
  return axiosInstance.get("post");
};

const likePost = async (postId: string) => {
  return axiosInstance.patch(`post/${postId}/like`, {
    liking: true,
  } as UpdatePostDto);
};

const bookmarkPost = async (postId: string) => {
  return axiosInstance.post(`saved`, {
    postId: postId,
  });
};

const getUserPosts = async (username: string) => {
  return axiosInstance.get(`post/created/${username}`);
};
export { getPosts, likePost, bookmarkPost, getUserPosts };

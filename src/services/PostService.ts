import { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { Post } from "./response/post-response";

const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
  return axiosInstance.get("post");
};

const likePost = async () => {};

export { getPosts };

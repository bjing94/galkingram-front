import { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { User } from "./response/user-response";

const getAllUsers = async (): Promise<AxiosResponse<User[]>> => {
  return axiosInstance.get("all");
};

export { getAllUsers };

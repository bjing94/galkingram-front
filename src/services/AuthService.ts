import { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import LoginDto from "./dto/login.dto";

const Login = async (dto: LoginDto) => {
  const response = await axiosInstance.post("auth/login", dto);
  return response.data;
};

const GetProfile = async (): Promise<
  AxiosResponse<{
    id: string;
    username: string;
    email: string;
    createdAt: string;
  }>
> => {
  return axiosInstance.get("user");
};

const CheckAuth = async (): Promise<AxiosResponse<{ auth: boolean }>> => {
  return axiosInstance.get("auth/check");
};

export { Login, GetProfile, CheckAuth };

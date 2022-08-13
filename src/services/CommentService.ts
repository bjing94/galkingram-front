import axiosInstance from "./axios-instance";
import CreateCommentDto from "./dto/create-comment.dto";

const createComment = async (dto: CreateCommentDto) => {
  return axiosInstance.post("comments", dto);
};

export { createComment };

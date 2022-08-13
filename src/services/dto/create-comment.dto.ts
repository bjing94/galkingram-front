export default interface CreateCommentDto {
  body: string;

  postId?: string;

  parentCommentId?: string;
}

export default interface UpdatePostDto {
  description?: string;
  newImageIds?: string[];
  liking?: boolean;
  commenting?: boolean;
  bookmarking?: boolean;
}

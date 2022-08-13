import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineMore,
  AiOutlineSend,
  AiOutlineSmile,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

import styled from "styled-components";
import { Img } from "../../services/response/post-response";
import { User } from "../../services/response/user-response";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";

const PostContainer = styled.div`
  border: solid 1px #dbdbdb;
  width: 614px;
  height: fit-content;
  border-radius: 4px;
  margin-bottom: 12px;
  overflow-x: hidden;
`;

interface PostProperties {
  width: number;
  description: string;
  likes: any[];
  user: User;
  media: Img[];
  comments: any[];
  createdAt: Date;
  postId: string;
}
export default function Post({
  width,
  description,
  likes,
  user,
  media,
  comments,
  createdAt,
  postId,
}: PostProperties) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <PostContainer>
      <PostHeader user={user} />
      <PostMedia
        media={media}
        activeIdx={activeImage}
        setActiveIdx={setActiveImage}
        width={width}
      />
      <PostFooter
        media={media}
        activeIdx={activeImage}
        description={description}
        likes={likes}
        comments={comments}
        user={user}
        createdAt={createdAt}
        postId={postId}
      />
    </PostContainer>
  );
}

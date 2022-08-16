import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSend,
  AiOutlineSmile,
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import styled from "styled-components";
import { User } from "../../services/response/user-response";
import * as Yup from "yup";
import { createComment } from "../../services/CommentService";
import authStore from "../../store/auth-store";
import { bookmarkPost, likePost } from "../../services/PostService";
import Like from "../../services/response/like-response";
import Comment from "../../services/response/comment-response";
import PostActions from "./PostActions";
import CommentInput from "./CommentInput";

const FooterContainer = styled.div`
  position: relative;
`;

const SelectionContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 8px;
  transform: translateX(-50%);
  display: flex;
  width: fit-content;
  height: fit-content;
`;

const DatePosted = styled.div`
  padding-left: 20px;
  margin-bottom: 10px;
  color: #8e8e8e;
`;

const PostDescription = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
  & span {
    font-weight: bold;
  }
`;

const CommentSection = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
`;

const CommentContainer = styled.div``;

const CommentContent = styled.div`
  & span {
    font-weight: bold;
  }
`;
const CommentReply = styled(CommentContent)`
  padding-left: 20px;
`;

const ShowCommentsButton = styled.button`
  color: #8e8e8e;
  border: none;
  background: none;
`;

const SelectionItem = styled.div`
  position: relative;
  width: 7px;
  height: 7px;
  margin-right: 5px;
  background: #a8a8a8;
  border-radius: 50%;

  &.selected {
    background: #0095f6;
  }
`;

interface FooterProps {
  activeIdx: number;
  media: any[];
  user: User;
  description: string;
  createdAt: Date;
  likes: Like[];
  comments: Comment[];
  postId: string;
}
export default function PostFooter({
  activeIdx,
  media,
  user,
  description,
  likes,
  comments,
  createdAt,
  postId,
}: FooterProps) {
  const [currentComments, setCurrentComments] = useState(
    comments.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
  );

  const selections = media.map((item, idx) => {
    if (idx === activeIdx)
      return <SelectionItem className="selected" key={idx} />;

    return <SelectionItem key={idx} />;
  });

  const commentElements = currentComments.map((item) => {
    return (
      <CommentContainer key={item.id}>
        <CommentContent>
          <span>{item.user.username}</span> {item.body}
        </CommentContent>
        {/* <CommentReply>
          <span>loler</span> yeah very good
        </CommentReply> */}
      </CommentContainer>
    );
  });
  let Difference_In_Time = Date.now() - createdAt.getTime();
  let Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
  return (
    <FooterContainer>
      <PostActions likes={likes} postId={postId} />
      <PostDescription>
        <span>{user.username}</span> {description}
      </PostDescription>
      <CommentSection>
        <ShowCommentsButton>Show all comments</ShowCommentsButton>
        {commentElements}
      </CommentSection>
      <DatePosted>{`${Difference_In_Days} days ago`}</DatePosted>
      <CommentInput
        postId={postId}
        currentComments={currentComments}
        setCurrentComments={setCurrentComments}
      />
      <SelectionContainer>{selections}</SelectionContainer>
    </FooterContainer>
  );
}

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

const FooterContainer = styled.div`
  position: relative;
`;

const IconsContainer = styled.div`
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 6px;
`;

const IconButton = styled.button`
  padding: 8px;
  border: none;
  background: none;
`;

const BookmarkButton = styled(IconButton)`
  margin-left: auto;
  padding-right: 0;
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

const LikesAmount = styled.div`
  padding-left: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const DatePosted = styled.div`
  padding-left: 20px;
  margin-bottom: 10px;
  color: #8e8e8e;
`;

const CreateCommentWrapper = styled.form`
  width: 100%;
  border-top: solid 1px #dbdbdb;
  padding: 4px 12px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;

  & input {
    background: none;
    border: none;
    flex-grow: 1;

    &:focus {
      outline: none;
    }
  }
`;

const CreateCommentButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-size: 14px;
  font-weight: bold;
`;

const SelectEmojiButton = styled(IconButton)`
  padding-left: 0;
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
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  const [currentComments, setCurrentComments] = useState(
    comments.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
  );

  useEffect(() => {
    setLiked(likes.findIndex((item) => item.user.id === authStore.id) !== -1);
    setBookmarked(
      authStore.bookmarks.findIndex((item) => item.post.id === postId) !== -1
    );
  }, []);

  const handleLike = () => {
    likePost(postId).then((response) => {
      console.log(response.data);
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    });
  };

  const handleBookmark = () => {
    bookmarkPost(postId).then((response) => {
      console.log(response.data);
      setBookmarked(!bookmarked);
    });
  };

  const selections = media.map((item, idx) => {
    if (idx === activeIdx)
      return <SelectionItem className="selected" key={idx} />;

    return <SelectionItem key={idx} />;
  });

  const formik = useFormik({
    initialValues: {
      commentInput: "",
    },
    validationSchema: Yup.object({
      commentInput: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      createComment({
        postId: postId,
        body: values.commentInput,
      })
        .then((response) => {
          console.log(response);
          const newComments = [...currentComments];
          newComments.push(response.data);
          setCurrentComments(newComments);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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

  return (
    <FooterContainer>
      <IconsContainer>
        <IconButton onClick={handleLike}>
          {liked ? (
            <AiFillHeart size={28} fill="red" />
          ) : (
            <AiOutlineHeart size={28} />
          )}
        </IconButton>
        <IconButton>
          <AiOutlineMessage size={28} />
        </IconButton>
        <IconButton>
          <AiOutlineSend size={28} />
        </IconButton>

        <BookmarkButton onClick={handleBookmark}>
          {bookmarked ? <BsBookmarkFill size={28} /> : <BsBookmark size={28} />}
        </BookmarkButton>
      </IconsContainer>
      <LikesAmount>{likeCount} likes</LikesAmount>
      <PostDescription>
        <span>{user.username}</span> {description}
      </PostDescription>
      <CommentSection>
        <ShowCommentsButton>Show all comments</ShowCommentsButton>
        {commentElements}
      </CommentSection>
      <DatePosted>{createdAt.toDateString()}</DatePosted>
      <CreateCommentWrapper onSubmit={formik.handleSubmit}>
        <CommentInputContainer>
          <SelectEmojiButton>
            <AiOutlineSmile size={24} />
          </SelectEmojiButton>
          <input
            id="commentInput"
            name="commentInput"
            placeholder="Ваш комментарий"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.commentInput}
          />
          <CreateCommentButton type="submit">Create</CreateCommentButton>
        </CommentInputContainer>
      </CreateCommentWrapper>
      <SelectionContainer>{selections}</SelectionContainer>
    </FooterContainer>
  );
}

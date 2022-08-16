import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSend,
} from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import styled from "styled-components";
import { likePost, bookmarkPost } from "../../services/PostService";
import Like from "../../services/response/like-response";
import authStore from "../../store/auth-store";
import postStore from "../../store/post-store";
const IconsContainer = styled.div`
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 6px;
  border-top: 1px solid #dbdbdb;
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

const LikesAmount = styled.div`
  padding-left: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
`;

interface ActionsProperties {
  likes: Like[];
  postId: string;
}
export default function PostActions({ likes, postId }: ActionsProperties) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

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

  const handleSetActivePost = () => {
    // postStore.setActivePost(postId);
  };

  return (
    <>
      <IconsContainer>
        <IconButton onClick={handleLike}>
          {liked ? (
            <AiFillHeart size={28} fill="red" />
          ) : (
            <AiOutlineHeart size={28} />
          )}
        </IconButton>
        <IconButton onClick={handleSetActivePost}>
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
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import postStore from "../../store/post-store";
import CommentInput from "../Post/CommentInput";
import PostActions from "../Post/PostActions";
import PostHeader from "../Post/PostHeader";
import PostMedia from "../Post/PostMedia";
import { GrClose } from "react-icons/gr";
import useWindowSize from "../../hooks/useWindowResize";

const PopupBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
`;
const PostPopupContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1180px;
  margin: 0 80px;
  height: min-content;
  max-height: calc(100vh - 40px);
  background: white;
  margin-top: 40px;
  overflow: hidden;
  border-radius: 5px;
  min-height: 450px;
`;
const PopupMedia = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  background: black;
  width: 100%;
  max-width: 680px;
  height: 100%;
`;
const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  flex-shrink: 0;
  max-height: 100%;
  width: 500px;
`;
const PostDescription = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 12px;
  padding-right: 20px;
  margin-top: 10px;
  margin-bottom: 24px;
  font-size: 14px;
  & span {
    font-weight: bold;
  }
`;

const CommentSection = styled.div`
  padding-left: 12px;
  padding-right: 20px;
  margin-bottom: 10px;
  flex-grow: 1;
  overflow-y: scroll;
`;

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: centers;
  padding-top: 5px;
  padding-right: 16px;
  padding-bottom: 16px;
  font-size: 14px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const CommentReply = styled(CommentContent)`
  padding-left: 20px;
`;
const UserAvatar = styled.img`
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 18px;
`;

const LikeCommentButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  padding: 8px;
  border: none;
  background: none;
`;

const CommentSmall = styled.div`
  display: flex;
  & > * {
    font-size: 12px;
    margin-right: 10px;
  }

  & > div {
    color: rgb(38, 38, 38);
  }

  & > button {
    background: none;
    border: none;
    color: rgb(142, 142, 142);
    font-weight: bold;
  }
`;

const CommentDescription = styled.div`
  margin-bottom: 16px;
  & span {
    font-weight: bold;
  }
`;

const DescriptionText = styled.div`
  & span {
    font-weight: bold;
  }
`;

const DatePosted = styled.div`
  padding-left: 20px;
  margin-bottom: 10px;
  color: #8e8e8e;
`;

const CloseButton = styled.button`
  position: absolute;
  border: none;
  background: none;
  right: 20px;
  top: 20px;
`;
export default function PostPopup() {
  const { id, likes, comments, user, description, post_imgs } =
    postStore.activePost!;
  const [currentComments, setCurrentComments] = useState(comments);
  const [activeIdx, setActiveIdx] = useState(0);

  const [containerHeight, setContainerHeight] = useState(0);
  const [mediaWidth, setMediaWidth] = useState(680);

  const mediaRef = useRef<HTMLDivElement>(null);

  const commentElements = currentComments.map((item) => {
    return (
      <CommentContainer key={item.id}>
        <UserAvatar
          width={32}
          height={32}
          src="https://i.kym-cdn.com/entries/icons/mobile/000/030/873/Screenshot_20.jpg"
        />
        <CommentContent>
          <CommentDescription>
            <span>{item.user.username}</span> {item.body}
          </CommentDescription>
          <CommentSmall>
            <div>1 day</div>
            <button>Likes: 1</button>
            <button>Respond</button>
          </CommentSmall>
        </CommentContent>
        {/* <CommentReply>
          <span>loler</span> yeah very good
        </CommentReply> */}

        <LikeCommentButton>
          <AiOutlineHeart size={12} />
        </LikeCommentButton>
      </CommentContainer>
    );
  });
  const media = post_imgs.map((item) => {
    return item.img;
  });

  const size = useWindowSize();
  useEffect(() => {
    if (mediaRef.current && mediaRef.current.offsetWidth) {
      console.log("Size is ", size, mediaRef.current.offsetWidth);
      setMediaWidth(mediaRef.current.offsetWidth);
      setContainerHeight((mediaRef.current.offsetWidth * 5) / 4);
    }
  }, [size]);
  return (
    <PopupBackground>
      <PostPopupContainer style={{ height: `${containerHeight}px` }}>
        <PopupMedia ref={mediaRef}>
          <PostMedia
            width={mediaWidth}
            media={media}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
          />
        </PopupMedia>
        <PopupContent>
          <PostHeader user={user} />
          <PostDescription>
            <UserAvatar
              width={32}
              height={32}
              src="https://i.kym-cdn.com/entries/icons/mobile/000/030/873/Screenshot_20.jpg"
            />
            <DescriptionText>
              <span>{user.username}</span>
              {` Подборка ваших уже горячо любимых nike & butterfly 🦋

Цвет изделия и вышивки можно сделать на твой вкус, пиши в Директ - выберем вместе 🫶

Цена на изделия с вышивкой из нашего каталога

Футболка стандарт 1.800 ₽
Футболка оверсайз 2.000 ₽
Свитшот 2.800 ₽
Худи 3.200 ₽`}
            </DescriptionText>
          </PostDescription>
          <CommentSection>{commentElements}</CommentSection>
          {/* <div style={{ flexGrow: 1 }}>t</div> */}
          <PostActions postId={id} likes={likes} />
          <DatePosted>{`2 days ago`}</DatePosted>
          <CommentInput
            postId={id}
            currentComments={currentComments}
            setCurrentComments={setCurrentComments}
          />
        </PopupContent>
      </PostPopupContainer>
      <CloseButton
        onClick={() => {
          postStore.setActivePost(null);
        }}
      >
        <AiOutlineClose size={24} fill="white" />
      </CloseButton>
    </PopupBackground>
  );
}

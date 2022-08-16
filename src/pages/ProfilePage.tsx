import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillMessage,
  AiFillSetting,
  AiOutlineAppstore,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import styled from "styled-components";
import Button from "../components/Button";
import { BiUserPin } from "react-icons/bi";
import { Post } from "../services/response/post-response";
import { getUserPosts } from "../services/PostService";
import { useParams } from "react-router-dom";
import useWindowSize from "../hooks/useWindowResize";
import postStore from "../store/post-store";

const ProfilePageWrapper = styled.div`
  margin: 0 10px;
`;
const ProfileHeader = styled.header`
  display: flex;
  width: 100%;
  padding: 20px;
  margin-bottom: 44px;
`;

const AvatarInput = styled.div`
  margin-right: 30px;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  & > input {
    display: none;
  }

  & > label {
    display: block;
    background: black;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border-radius: 50%;
  }
`;

const InfoSection = styled.div`
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 30px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & > h2 {
    font-size: 28px;
    font-weight: 200;
  }
  & > button {
    margin-left: 20px;
  }

  & > #options-button {
    margin-left: 5px;
  }
`;

const Statistic = styled.div`
  font-size: 16px;
  & > span {
    font-weight: bold;
  }
  margin-right: 40px;
`;

const ProfileName = styled.div`
  font-weight: bold;
`;

const ProfileBody = styled.div`
  width: 100%;
  border-top: 1px solid gray;
`;
const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SectionButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  margin-right: 60px;
  padding-top: 1px;
  height: 52px;
  font-size: 12px;
  text-transform: Uppercase;
  &.selected {
    border-top: 1px solid black;
    padding-top: none;
    color: black;
  }

  & > svg {
    margin-right: 6px;
  }
`;

const PostItem = styled.div`
  position: relative;
  width: 100%;
  background: black;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  & > .overlay {
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
`;

const PostAction = styled.div`
  display: flex;
  color: white;
  font-weight: bold;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  & > svg {
    margin-right: 5px;
  }
`;
const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 28px;
  @media (max-width: 711px) {
    grid-gap: 3px;
  }
`;

export default function ProfilePage() {
  const { username } = useParams();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!username) {
      return;
    }
    getUserPosts(username).then((response) => {
      console.log(response.data);
      setUserPosts(response.data);
    });
  }, [username]);

  const postItems = userPosts.map((item) => {
    return (
      <PostItem
        style={{
          backgroundImage: `url(http://localhost:3000/${item.post_imgs[0].img.src})`,
        }}
        onClick={() => {
          postStore.setActivePost(item);
        }}
      >
        <div className="overlay">
          <PostAction>
            <AiFillHeart fill="white" size={24} />
            <span>4</span>
          </PostAction>
          <PostAction>
            <AiFillMessage fill="white" size={24} />
            <span>4</span>
          </PostAction>
        </div>
      </PostItem>
    );
  });
  return (
    <ProfilePageWrapper>
      <ProfileHeader>
        <AvatarInput>
          <label htmlFor="avatar-input" />
          <input name="avatar-input" type="file" />
        </AvatarInput>
        <InfoSection>
          <Row>
            <h2>bjing</h2>
            <Button variant="outline" color="secondary">
              Edit profile
            </Button>
            <AiFillSetting id="options-button" size={30} />
          </Row>
          <Row>
            <Statistic>
              <span>17</span> posts
            </Statistic>
            <Statistic>
              <span>28</span> subscribers
            </Statistic>
            <Statistic>
              <span>20</span> subscribtions
            </Statistic>
          </Row>
          <Row>
            <ProfileName>Ivan</ProfileName>
          </Row>
        </InfoSection>
      </ProfileHeader>
      <ProfileBody>
        <SectionContainer>
          <SectionButton>
            <AiOutlineAppstore size={18} />
            Posts
          </SectionButton>
          <SectionButton>
            <BsBookmark size={18} />
            Saved
          </SectionButton>
          <SectionButton>
            <BiUserPin size={18} />
            Tagged
          </SectionButton>
        </SectionContainer>
        <PostsContainer>{postItems}</PostsContainer>
      </ProfileBody>
    </ProfilePageWrapper>
  );
}

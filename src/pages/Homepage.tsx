import React, { useEffect, useState } from "react";
import Post from "../components/Post/Post";
import styled from "styled-components";
import counter from "../store/counter";
import { observer } from "mobx-react-lite";
import authStore from "../store/auth-store";
import ProfileAvatar from "../components/ProfileAvatar";
import Button from "../components/Button";
import postStore from "../store/post-store";

const HomepageWrapper = styled.div`
  display: flex;
  width: 935px;
  margin: 0 auto;
  padding-top: 30px;
`;

const ProfileInfo = styled.div`
  height: fit-content;
  margin-left: 40px;
  padding-top: 16px;
  width: 293px;
`;

const ProfileLink = styled.a`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  font-size: 14px;
  & span[id="user-fullname"] {
    color: gray;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 130px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ChangeButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-size: 14px;
  font-weight: bold;
  height: fit-content;
  margin-left: auto;
`;
const PostList = styled.div``;

const RecommendedProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;

  & button {
    margin-left: 8px;
  }
`;

const RecommendationSection = styled.div`
  margin-top: 12px;
  padding: 4px 0;
  color: rgb(142, 142, 142);
  font-weight: bold;
  font-size: 14px;
`;

function Homepage() {
  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const postElements = postStore.posts.map((item) => {
    console.log(item);
    return (
      <Post
        key={item.id}
        description={item.description}
        width={625}
        likes={item.likes}
        comments={item.comments}
        media={item.post_imgs.map((item) => item.img)}
        user={item.user}
        createdAt={new Date(item.created_at)}
        postId={item.id}
      />
    );
  });
  return (
    <HomepageWrapper>
      <PostList>{postElements}</PostList>
      <ProfileInfo>
        <ProfileContent>
          <ProfileAvatar size={50} />
          <ProfileLink>
            {authStore.username}
            <span id="user-fullname">Ivan</span>
          </ProfileLink>
          <ChangeButton>Переключиться</ChangeButton>
        </ProfileContent>
        {/* Recommendations */}
        <RecommendationSection>Рекомендации для вас</RecommendationSection>
        <RecommendedProfile>
          <ProfileAvatar size={30} />
          <ProfileLink>
            {authStore.username}
            {/* Подписаны: senkanatari */}
            <span id="user-fullname">
              Subscribed: test1,test2, test3, text4
            </span>
          </ProfileLink>
          <Button>Подписаться</Button>
        </RecommendedProfile>
        <RecommendedProfile>
          <ProfileAvatar size={30} />
          <ProfileLink>
            {authStore.username}
            {/* Подписаны: senkanatari */}
            <span id="user-fullname">
              Subscribed: test1,test2, test3, text4
            </span>
          </ProfileLink>
          <Button>Подписаться</Button>
        </RecommendedProfile>
        <RecommendedProfile>
          <ProfileAvatar size={30} />
          <ProfileLink>
            {authStore.username}
            <span id="user-fullname">
              Subscribed: test1,test2, test3, text4
            </span>
          </ProfileLink>
          <Button>Подписаться</Button>
        </RecommendedProfile>
      </ProfileInfo>
    </HomepageWrapper>
  );
}
export default observer(Homepage);
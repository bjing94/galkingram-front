import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import styled from "styled-components";
import { User } from "../../services/response/user-response";
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  border-bottom: 1px solid #dbdbdb;
`;
const PostUser = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 8px 12px;
`;
const UserAvatar = styled.img`
  border-radius: 50%;
  border: 1px solid black;
`;
const PostActions = styled.button`
  width: 24px;
  height: 24px;
  margin: 16px;
  border: none;
  background: none;
  transform: rotate(90deg);
`;
const UserDetails = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
`;
const Username = styled.div`
  font-weight: bold;
`;
const Location = styled.div``;

interface PostHeaderProps {
  user: User;
}
export default function PostHeader({ user }: PostHeaderProps) {
  return (
    <HeaderContainer>
      <PostUser>
        <UserAvatar
          width={32}
          height={32}
          src="https://i.kym-cdn.com/entries/icons/mobile/000/030/873/Screenshot_20.jpg"
        />
        <UserDetails>
          <Username>{user.username}</Username>
          <Location>Moscow</Location>
        </UserDetails>
      </PostUser>
      <PostActions>
        <AiOutlineMore size={24} />
      </PostActions>
    </HeaderContainer>
  );
}

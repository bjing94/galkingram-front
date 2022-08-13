import React from "react";
import {
  AiFillCiCircle,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import styled from "styled-components";
import Input from "./Input";

const StyledAppbar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px #dbdbdb;
`;

const AppbarContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  max-width: calc(935px + 40px);
`;
const AppbarLogoContainer = styled.div`
  flex-grow: 1;
  height: 36px;
  & img {
    max-width: 335px;
    max-height: 100%;
  }
`;

const IconsWrapper = styled.div`
  flex: 1 0 127px;
`;
const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  flex-grow: 1;
  flex-shrink: 0;
  padding-left: 24px;

  & svg {
    margin-left: 14px;
  }
`;
export default function Appbar() {
  return (
    <StyledAppbar>
      <AppbarContent>
        <AppbarLogoContainer>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
            alt="instagram_logo"
          />
        </AppbarLogoContainer>
        <Input />
        <IconsWrapper>
          <IconsContainer>
            <AiFillHome size={24} />
            <AiOutlineMessage size={24} />
            <AiOutlinePlusSquare size={24} />
            <AiOutlineCompass size={24} />
            <AiOutlineHeart size={24} />
            <AiFillCiCircle size={24} />
          </IconsContainer>
        </IconsWrapper>
      </AppbarContent>
    </StyledAppbar>
  );
}

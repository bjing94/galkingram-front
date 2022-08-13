import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 36px;
  padding: 3px 16px;
  border-radius: 8px;
  background-color: #efefef;
  flex: 0 1 auto;
  min-width: 268px;
`;
const StyledInput = styled.input`
  border: 0;
  background: inherit;
  height: 100%;
  min-width: 125px;
  &:focus {
    outline: 0;
  }
  // color: #a0a0a0;
`;
export default function Input({ ...rest }) {
  return (
    <InputContainer>
      <AiOutlineSearch size={24} color="#a0a0a0" />
      <StyledInput placeholder="Search" />
    </InputContainer>
  );
}

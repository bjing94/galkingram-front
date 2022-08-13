import React from "react";
import styled from "styled-components";

const StyledProfileAvatar = styled.img`
  border: none;
  border-radius: 50%;
  background: black;
  flex-shrink: 0;
`;
interface ProfileAvatarProps {
  size: number;
}
export default function ProfileAvatar({ size }: ProfileAvatarProps) {
  return (
    <StyledProfileAvatar
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
}

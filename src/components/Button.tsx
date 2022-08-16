import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children?: any;
  variant?: "outline" | "text";
  color?: "primary" | "secondary";
}

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-size: 14px;
  font-weight: normal;
  height: fit-content;
  margin-left: auto;
  flex-shrink: 0;
  padding: 4px 9px;

  &.outline {
    border-radius: 4px;
    border: 1px solid #0095f6;
  }

  &.primary {
    color: #0095fb;
  }

  &.secondary {
    border-color: #dbdbdb;
    color: black;
  }
`;

export default function Button({
  children,
  variant = "text",
  color = "primary",
  ...rest
}: ButtonProps) {
  return (
    <StyledButton className={`${variant} ${color}`} {...rest}>
      {children}
    </StyledButton>
  );
}

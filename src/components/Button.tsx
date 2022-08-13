import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children?: any;
  variant?: "outline" | "text";
}

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-size: 12px;
  font-weight: bold;
  height: fit-content;
  margin-left: auto;
  flex-shrink: 0;
`;

export default function Button({ children, variant, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

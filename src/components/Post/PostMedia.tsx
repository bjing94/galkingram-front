import { join } from "path";
import React from "react";
import styled from "styled-components";

const MediaWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 500px;
  transition: 0.5s ease-in-out;
`;

const MediaItem = styled.div`
  width: 625px;
  height: 100%;
  background: url("https://pop.inquirer.net/files/2021/05/834.png");
  background-size: cover;
  background-repeat: no-repeat;
`;

interface MediaProperties {
  media: any[];
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
  width: number;
}
export default function PostMedia({
  media,
  activeIdx,
  setActiveIdx,
  width,
}: MediaProperties) {
  const MediaElements = media.map((item, idx) => {
    return (
      <MediaItem
        style={{
          backgroundImage: "url(" + "http://localhost:3000/" + item.src + ")",
          width: `${width}px`,
        }}
        onClick={() => {
          setActiveIdx(idx + 1);
        }}
      />
    );
  });

  return (
    <MediaWrapper style={{ transform: `translateX(-${width * activeIdx}px)` }}>
      {MediaElements}
    </MediaWrapper>
  );
}

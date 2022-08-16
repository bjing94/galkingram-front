import { join } from "path";
import React from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import styled from "styled-components";

const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: min-content;
`;

const MediaCarousel = styled.div`
  display: flex;
  width: fit-content;
  height: min-content;
  transition: 0.5s ease-in-out;
`;

const MediaItem = styled.div`
  background-size: cover;
  background-position: center center;
  width: 614px;
  height: calc(614px * 5 / 4);
  & .square {
    height: 614px;
  }
`;
const RoundButton = styled.button`
  position: absolute;
  top: 50%;
  border: none;
  background: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;
const LeftButton = styled(RoundButton)`
  left: 10px;
`;

const RightButton = styled(RoundButton)`
  right: 10px;
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
          backgroundImage: `url(http://localhost:3000/${item.src})`,
          width: `${width}px`,
          height: `${(width * 5) / 4}px`,
        }}
        key={idx}
      ></MediaItem>
    );
  });

  console.log(activeIdx, media.length);
  return (
    <MediaWrapper>
      <MediaCarousel
        style={{ transform: `translateX(-${width * activeIdx}px)` }}
      >
        {MediaElements}
      </MediaCarousel>

      {activeIdx !== 0 && (
        <LeftButton
          onClick={() => {
            if (activeIdx > 0) {
              setActiveIdx(activeIdx - 1);
            }
          }}
        >
          <AiFillLeftCircle size={30} fill={"#dbdbdb"} />
        </LeftButton>
      )}
      {activeIdx < media.length - 1 && (
        <RightButton
          onClick={() => {
            if (activeIdx < media.length - 1) {
              setActiveIdx(activeIdx + 1);
            }
          }}
        >
          <AiFillRightCircle size={30} fill={"#dbdbdb"} />
        </RightButton>
      )}
    </MediaWrapper>
  );
}

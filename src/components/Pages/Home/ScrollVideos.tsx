import React, { FC } from "react";
import { Video } from "types/Video";
import styled from "styled-components";
import { Loader } from "semantic-ui-react";
import { VideoCardWithUser } from "../VideoCardWithUser";

const ScrollWrapper = styled.div`
  height: 84vh;
  overflow: auto;
  will-change: transform;
  overscroll-behavior: none;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
`;

type ScrollVideosProps = {
  videos: Video[];
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  loadingMore: boolean;
  size?: "small";
};

export const ScrollVideos: FC<ScrollVideosProps> = ({
  videos,
  handleScroll,
  loadingMore,
  size,
}) => {
  return (
    <ScrollWrapper onScroll={handleScroll}>
      {videos.map((video) => {
        return (
          <VideoCardWithUser video={video} key={video.id} scroll size={size} />
        );
      })}
      <LoadingContainer>
        {loadingMore && <Loader active inline="centered" />}
      </LoadingContainer>
    </ScrollWrapper>
  );
};

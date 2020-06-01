import React, { FC, useContext } from "react";
import { Grid, Pagination, PaginationProps, Message } from "semantic-ui-react";
import { AppUser } from "types/AppUser";
import { PaginationWrapper } from "components/Common/PaginationVideoCard";
import { Video } from "types/Video";
import { VideoCardWithUser } from "components/Pages/VideoCardWithUser";
import { VideoCard } from "components/Pages/VideoCard";

type PaginationVideosProps = {
  videos: Video[];
  user: AppUser;
  handlePageChange: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => void;
  activePage: number;
  totalPages: number;
  withUser?: boolean;
};

export const PaginationVideos: FC<PaginationVideosProps> = ({
  videos,
  user,
  handlePageChange,
  activePage,
  totalPages,
  withUser,
}) => {
  if (videos.length === 0) {
    return <Message>動画がありません</Message>;
  }

  return (
    <>
      <Grid>
        {videos.map((video) => {
          return (
            <Grid.Column
              key={video.id}
              textAlign="center"
              mobile={16}
              tablet={8}
              computer={8}
            >
              {withUser ? (
                <VideoCardWithUser video={video} />
              ) : (
                <VideoCard video={video} />
              )}
            </Grid.Column>
          );
        })}
      </Grid>
      <PaginationWrapper>
        <Pagination
          totalPages={totalPages}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </PaginationWrapper>
    </>
  );
};

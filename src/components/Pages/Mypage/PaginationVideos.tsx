import React, { FC } from "react";
// import { Grid, Message } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import {
  Grid,
  Pagination,
  PaginationProps,
  Message,
  ButtonProps,
} from "semantic-ui-react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { VideoCardComment } from "components/Common/Comment";
import { AppUser } from "types/AppUser";
import { VideoView } from "components/Pages/VideoView";
import {
  PaginationVideoCard,
  PaginationVideoCardBody,
  TagButton,
  PaginationWrapper,
} from "components/Common/PaginationVideoCard";
import { Video } from "types/Video";

type PaginationVideosProps = {
  videos: Video[];
  user: AppUser;
  handlePageChange: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => void;
  activePage: number;
  totalPages: number;
};

export const PaginationVideos: FC<PaginationVideosProps> = ({
  videos,
  user,
  handlePageChange,
  activePage,
  totalPages,
}) => {
  const history = useHistory();

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    console.log(data);
    history.push(`/${data.uid}/videos#${data.taglabel}`);
    e.preventDefault();
  };

  console.log(videos);

  return (
    <>
      <Grid>
        {videos.length === 0 && (
          <Message warning>動画が登録されていません</Message>
        )}
        {videos.map((video) => {
          return (
            <Grid.Column
              key={video.id}
              textAlign="center"
              mobile={16}
              tablet={8}
              computer={8}
            >
              <Link to={`/${video.user.uid}/videos/${video.id}`}>
                <PaginationVideoCard>
                  <VideoView
                    videoId={video.videoId}
                    videoType={video.type}
                    // size="small"
                  />
                  <PaginationVideoCardBody>
                    <div>
                      {video.tags &&
                        video.tags.map((tag) => {
                          return (
                            <TagButton
                              key={`${video.id}${tag}`}
                              primary
                              size="mini"
                              onClick={handleTagClick}
                              taglabel={tag}
                              uid={video.user.uid}
                            >
                              {tag}
                            </TagButton>
                          );
                        })}
                    </div>
                    <VideoCardComment>
                      <p>{video.comment}</p>
                      <span>
                        {moment(video.updatedAt.toDate()).format(
                          "YYYY年MM月DD日"
                        )}
                      </span>
                    </VideoCardComment>
                  </PaginationVideoCardBody>
                </PaginationVideoCard>
              </Link>
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

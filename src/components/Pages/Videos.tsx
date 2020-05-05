import React, { FC, useContext, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Segment,
  Pagination,
  PaginationProps,
} from "semantic-ui-react";
import queryString from "query-string";
import { useVideos } from "utils/useVideos";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { Loading } from "components/Atoms/Loading";
import { SideMenuContext } from "context";
// import { Comment } from "components/Pages/Mypage/Video/Video";
import styled from "styled-components";
import { Video } from "types/Video";
import { VideoView } from "./VideoView";

type VideosProps = {
  uid: string;
};

const Comment = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2em;
`;

// TODO: なんかレンダリング多い
export const Videos: FC<VideosProps> = ({ uid }) => {
  const { videos, videosCount, loading } = useVideos(uid);
  const { setMenuLocation } = useContext(SideMenuContext);
  const [activePage, setActivePage] = useState<number>(1);
  const [pageVideos, setPageVideos] = useState<Video[]>([]);
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  console.log(match);
  console.log(queryString.parse(location.search));
  useEffect(() => {
    setMenuLocation("videos");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  useEffect(() => {
    const page = queryString.parse(location.search).page as string | undefined;
    setActivePage(page ? Number(page) : 1);
  }, [location]);

  useEffect(() => {
    const topVideoIndex = (activePage - 1) * 4;
    setPageVideos(videos.slice(topVideoIndex, topVideoIndex + 4));
  }, [videos, activePage]);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    // const page = data.activePage ? Number(data.activePage) : 1;
    // setActivePage(page);
    history.push(`${match.url}?page=${data.activePage}`);
  };

  console.log(activePage);
  console.log(videos);
  console.log(pageVideos);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid>
        {pageVideos.map((video) => {
          return (
            <Grid.Column width={8} key={video.id} textAlign="center">
              <Link to={`${match.url}/${video.id}`}>
                <Segment style={{ height: "100%" }}>
                  <VideoView
                    videoId={video.videoId}
                    videoType={video.type}
                    // size="small"
                  />
                  <Comment>{video.comment}</Comment>
                  <Button circular icon="arrow right" />
                </Segment>
              </Link>
            </Grid.Column>
          );
        })}
      </Grid>
      <PaginationWrapper>
        <Pagination
          totalPages={Math.ceil(videosCount / 4)}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </PaginationWrapper>
    </>
  );
};

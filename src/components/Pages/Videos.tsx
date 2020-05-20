import React, { FC, useContext, useEffect, useState, useMemo } from "react";
import {
  Grid,
  Segment,
  Pagination,
  PaginationProps,
  Message,
  Button,
  Dropdown,
  ButtonProps,
  DropdownProps,
} from "semantic-ui-react";
import queryString from "query-string";
import moment from "moment";
import { useVideos } from "utils/useVideos";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { Loading } from "components/Common/Loading";
import { SideMenuContext, TagsContext } from "context";
import styled from "styled-components";
import { VideoCardComment } from "components/Common/Comment";
import { AppUser } from "types/AppUser";
import { VideoView } from "./VideoView";

type VideosProps = {
  user: AppUser;
};

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2em;
`;

const FlexSegment = styled(Segment)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition-duration: 0.3s;
  text-align: left;
  p {
    margin: 0.4em 0;
  }
  :hover {
    box-shadow: 0 2px 8px #bbb;
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 1.5em;
`;

const VideoCardBody = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

const TagButton = styled(Button)`
  margin-bottom: 0.2em !important;
`;

const videoPerPage = 4;

export const Videos: FC<VideosProps> = ({ user }) => {
  const [filterTag, setFilterTag] = useState<string>("");
  const { videos, loading } = useVideos({ user, filterTag });
  const { setMenuLocation } = useContext(SideMenuContext);
  const [activePage, setActivePage] = useState<number>(1);
  const { tags } = useContext(TagsContext);
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setMenuLocation("videos");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  useEffect(() => {
    const page = queryString.parse(location.search).page as string | undefined;
    setActivePage(page ? Number(page) : 1);
    const tagLabel = decodeURI(location.hash.substr(1));
    if (tagLabel) {
      setFilterTag(tags.some((tag) => tag.label === tagLabel) ? tagLabel : "");
    }
  }, [location, tags]);

  const pageVideos = useMemo(() => {
    const topVideoIndex = (activePage - 1) * videoPerPage;

    return videos.slice(topVideoIndex, topVideoIndex + videoPerPage);
  }, [activePage, videos]);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    history.push(`${match.url}?page=${data.activePage}`);
  };

  const handleFilterChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    setFilterTag((value as string) || "");
    history.push(match.url);
  };

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    history.push(`${match.url}#${data.children as string}`);
    e.preventDefault();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <StyledDropdown
        clearable
        options={tags.map((tag) => ({ value: tag.label, text: tag.label }))}
        selection
        placeholder="タグで絞り込む"
        value={filterTag}
        onChange={handleFilterChange}
      />
      <Grid>
        {pageVideos.length === 0 && (
          <Message warning>動画が登録されていません</Message>
        )}
        {pageVideos.map((video) => {
          return (
            <Grid.Column
              key={video.id}
              textAlign="center"
              mobile={16}
              tablet={8}
              computer={8}
            >
              <Link to={`${match.url}/${video.id}`}>
                <FlexSegment>
                  <VideoView
                    videoId={video.videoId}
                    videoType={video.type}
                    // size="small"
                  />
                  <VideoCardBody>
                    <div>
                      {video.tags &&
                        video.tags.map((tag) => {
                          return (
                            <TagButton
                              key={`${video.id}${tag}`}
                              primary
                              size="mini"
                              onClick={handleTagClick}
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
                  </VideoCardBody>
                </FlexSegment>
              </Link>
            </Grid.Column>
          );
        })}
      </Grid>
      <PaginationWrapper>
        <Pagination
          totalPages={Math.ceil(videos.length / videoPerPage)}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </PaginationWrapper>
    </>
  );
};

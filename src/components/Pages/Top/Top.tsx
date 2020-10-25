import React, { FC, useContext, useState, useEffect, useCallback } from "react";
import { AuthContext, SideMenuContext } from "context";
import { Loading } from "components/Common/Loading";
import { About } from "components/Pages/About/About";
import { Link } from "react-router-dom";
import { Grid, Button, Header } from "semantic-ui-react";
import { useRecentVideos } from "hooks/useRecentVideos";
import { ScrollVideos } from "components/Pages/Home/ScrollVideos";
import styled from "styled-components";

const CenteredHeader = styled(Header)`
  text-align: center;
`;

const maxVideosNumber = 32;

export const Top: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [fetchLimited, setFetchLimited] = useState(false);
  const {
    recentVideos,
    loading,
    fetchMore,
    allFetched,
    loadingMore,
  } = useRecentVideos();
  const { setMenuLocation } = useContext(SideMenuContext);

  useEffect(() => {
    setMenuLocation("other");
  }, [setMenuLocation]);

  useEffect(() => {
    if (recentVideos.length >= maxVideosNumber) {
      setFetchLimited(true);
    }
  }, [recentVideos]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (loadingMore || fetchLimited) return;
      const element = e.target;
      const threshold = 10;
      const { scrollHeight, scrollTop, clientHeight } = element as any;
      if (!allFetched && scrollHeight - scrollTop - threshold < clientHeight) {
        fetchMore();
      }
    },
    [allFetched, fetchLimited, fetchMore, loadingMore]
  );

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <Grid centered>
        <Grid.Column computer={8} mobile={16}>
          <Button as={Link} to="/login" color="teal" style={{ color: "#fff" }}>
            ログインはこちらから
          </Button>
          <About />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <CenteredHeader as="h4">新着登録動画</CenteredHeader>
          <ScrollVideos
            videos={recentVideos}
            handleScroll={handleScroll}
            loadingMore={loadingMore}
            size="small"
          />
        </Grid.Column>
      </Grid>
    );
  }

  return (
    <>
      <CenteredHeader as="h4">新着登録動画</CenteredHeader>
      <ScrollVideos
        videos={recentVideos}
        handleScroll={handleScroll}
        loadingMore={loadingMore}
      />
    </>
  );
};

import React, { FC, useState, useEffect, useContext } from "react";
import { AppUser } from "types/AppUser";
import { Grid, PaginationProps } from "semantic-ui-react";
import queryString from "query-string";
import { SideMenuContext } from "context";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { PaginationVideos } from "components/Pages/Mypage/PaginationVideos";
import { useLikeVideos } from "utils/useLikeVideos";
import { Loading } from "components/Common/Loading";

type FavoritesProps = {
  user: AppUser;
};

const videoPerPage = 4;

export const Favorites: FC<FavoritesProps> = ({ user }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const { setMenuLocation } = useContext(SideMenuContext);
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const { pageVideos, loading, totalVideoNumber } = useLikeVideos({
    user,
    activePage,
    videoPerPage,
  });

  console.log(pageVideos);
  console.log(loading);

  useEffect(() => {
    setMenuLocation("favorites");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  useEffect(() => {
    const page = queryString.parse(location.search).page as string | undefined;
    console.log(page);
    setActivePage(page ? Number(page) : 1);
  }, [location]);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    history.push(`${match.url}?page=${data.activePage}`);
  };

  return (
    <>
      <p>お気に入り</p>
      {loading ? (
        <Loading />
      ) : (
        <PaginationVideos
          user={user}
          activePage={activePage}
          videos={pageVideos}
          handlePageChange={handlePageChange}
          totalPages={Math.ceil(totalVideoNumber / videoPerPage)}
        />
      )}
    </>
  );
};

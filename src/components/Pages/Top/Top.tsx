import React, { FC, useContext } from "react";
import { AuthContext } from "context";
import { Loading } from "components/Common/Loading";
import { About } from "components/Pages/About/About";
import { Redirect } from "react-router-dom";

export const Top: FC = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    // AboutページかLoginページかにリダイレクトしてログイン促す
    return <About />;
  }

  return <Redirect to="/home" />;
};

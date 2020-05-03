import React, { FC, useContext, ReactNode } from "react";
import { AuthContext } from "context";
import { Redirect } from "react-router-dom";
import { Loader, Dimmer } from "semantic-ui-react";

type AuthProps = {
  children: ReactNode;
};

export const Auth: FC<AuthProps> = ({ children }): any => {
  const { currentUser, loading } = useContext(AuthContext);
  console.log(currentUser);
  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return children;
};

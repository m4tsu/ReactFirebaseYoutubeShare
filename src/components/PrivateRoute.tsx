import React, { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "context";
import { Dimmer, Loader } from "semantic-ui-react";

export const PrivateRoute: FC = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <Route
      render={(props) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

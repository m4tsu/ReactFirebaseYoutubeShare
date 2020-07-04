import React, { FC, useContext } from "react";
import { FirebaseContext, AuthContext } from "context";
import { firebase } from "FirebaseConfig";
import { useHistory, Redirect } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export const SignInButton: FC = () => {
  const { auth } = useContext(FirebaseContext);
  const { currentUser, setCredential } = useContext(AuthContext);
  const history = useHistory();
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "redirect",
    signInOptions: [
      {
        provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        customParameters: { lang: "ja" },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setCredential(authResult as firebase.auth.UserCredential);
        console.log(redirectUrl);
        const dest = redirectUrl || "/home";
        history.replace(dest);

        return false;
      },
    },
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};

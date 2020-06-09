import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AppBar } from "components/layouts/AppBar";
import { Mypage } from "components/Pages/Mypage/Mypage";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import { AuthContext, SideMenuContext, SideMenuLocation } from "context";
import Signin from "components/Pages/SignIn/SignIn";
import { UserPage } from "components/Pages/UserPage/UserPage";
import { NoMatch } from "components/Pages/NoMatch";
import { About } from "components/Pages/About/About";
import { Top } from "components/Pages/Top/Top";
import { FindUsers } from "components/Pages/Users/FindUsers";
import { ScrollToTop } from "components/Pages/ScrollToTop";

const Main = styled(Container)`
  margin-bottom: 40px;
  margin-top: 40px;
`;

const App = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const [menuLocation, setMenuLocation] = useState<SideMenuLocation>("other");

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <AppBar>
        <SideMenuContext.Provider value={{ menuLocation, setMenuLocation }}>
          <Main id="main">
            <Switch>
              <Route exact path="/login" component={Signin} />
              <Route exact path="/about" component={About} />
              <Route exact path="/users" component={FindUsers} />
              <Route path="/mypage">
                {currentUser ? (
                  <Mypage currentUser={currentUser} />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/home">
                {currentUser ? (
                  <Mypage currentUser={currentUser} />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route path="/:uid" component={UserPage} />
              <Route exact path="/" component={Top} />
              <Route component={NoMatch} />
            </Switch>
          </Main>
        </SideMenuContext.Provider>
      </AppBar>
    </Router>
  );
};

export default App;

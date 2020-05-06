import React from "react";
import ReactDOM from "react-dom";
import { FirebaseApp } from "FirebaseApp";
import { ThemeProvider } from "styled-components";

import "./index.scss";
import { theme } from "theme";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseApp>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </FirebaseApp>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

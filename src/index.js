// eslint-disable-next-line import/no-extraneous-dependencies
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import HashRouter from "react-router-dom/HashRouter";

import App from "./docs/components/app/App";

import { context } from "./docs/pages";

ReactDOM.render(
  <HashRouter>
    <App context={context} />
  </HashRouter>,
  document.getElementById("root"),
);

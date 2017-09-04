import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import HashRouter from "react-router-dom/HashRouter";

import App from "./components/app/App";

import { context } from "./pages";

ReactDOM.render(
  <HashRouter>
    <App context={context} />
  </HashRouter>,
  document.getElementById("root"),
);

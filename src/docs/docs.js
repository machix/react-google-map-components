import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app/App";

import { context } from "./pages";

ReactDOM.render(
  <BrowserRouter basename="/react-google-map-components">
    <App context={context} />
  </BrowserRouter>,
  document.getElementById("root"),
);

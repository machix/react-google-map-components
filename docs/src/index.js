import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { context } from "./pages";

import App from "./components/app/App";

ReactDOM.render(
  <BrowserRouter>
    <App context={context} />
  </BrowserRouter>,
  document.getElementById("root"),
);

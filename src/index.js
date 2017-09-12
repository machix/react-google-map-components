// eslint-disable-next-line import/no-extraneous-dependencies
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import HashRouter from "react-router-dom/HashRouter";

import App from "./docs/components/app/App";

renderApp();

if (module.hot) {
  module.hot.accept("./docs/components/app/App", renderApp);
}

function renderApp() {
  ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.getElementById("root"),
  );
}

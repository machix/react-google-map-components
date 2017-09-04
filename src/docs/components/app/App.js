import flatMap from "lodash/flatMap";
import get from "lodash/get";
import map from "lodash/map";

import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  DocsContext,
  DocsPage,
  DocsSection,
} from "../../docs-context/DocsContext";
import Sidebar from "../sidebar/Sidebar";

import "./App.css";

App.propTypes = {
  context: PropTypes.instanceOf(DocsContext).isRequired,
};

export default function App(props) {
  const context: DocsContext = props.context;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Sidebar context={context} />

          <Switch>
            {flatMap(context.sections, (section: DocsSection) =>
              map(section.pages, (page: DocsPage) => (
                <Route key={page.url} path={page.url} render={page.render} />
              )),
            )}

            <Redirect to={get(context.sections, [0, "pages", 0, "url"])} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

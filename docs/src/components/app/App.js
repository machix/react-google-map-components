import PropTypes from "prop-types";
import React from "react";
import { Route, Switch } from "react-router-dom";
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

          {context.sections.map((section: DocsSection) => (
            <Switch key={section.url}>
              {section.pages.map((page: DocsPage) => (
                <Route key={page.url} path={page.url} render={page.render} />
              ))}
            </Switch>
          ))}
        </div>
      </div>
    </div>
  );
}

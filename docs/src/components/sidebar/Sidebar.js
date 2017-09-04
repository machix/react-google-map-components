import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  DocsContext,
  DocsPage,
  DocsSection,
} from "../../docs-context/DocsContext";

Sidebar.propTypes = {
  context: PropTypes.instanceOf(DocsContext).isRequired,
};

export default function Sidebar(props) {
  const context: DocsContext = props.context;

  return (
    <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
      {context.sections.map((section: DocsSection) => (
        <ul key={section.url} className="nav nav-pills flex-column">
          <li className="nav-item">
            <span className="nav-link disabled">{section.name}</span>
          </li>

          {section.pages.map((page: DocsPage) => (
            <li key={page.url} className="nav-item">
              <NavLink
                exact
                to={page.url}
                className="nav-link"
                activeClassName="active"
              >
                {page.name}
              </NavLink>
            </li>
          ))}
        </ul>
      ))}
    </nav>
  );
}

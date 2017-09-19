import React from "react";
import PropTypes from "prop-types";
import kebabCase from "lodash/kebabCase";
import { NavLink, Route, Switch } from "react-router-dom";
import PropsTable from "./PropsTable";
import MarkdownView from "./MarkdownView";

export default class DocSection extends React.Component {
  static propTypes = {
    propsDocs: PropTypes.object,

    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    description: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    section: PropTypes.string.isRequired,
    sectionUrl: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.section = props.name;
    this.sectionUrl = ["", kebabCase(props.name)].join("/");

    this.infoUrl = [this.sectionUrl, "info"].join("/");
    this.propsUrl = [this.sectionUrl, "props"].join("/");
    this.examplesUrl = [this.sectionUrl, "examples"].join("/");
  }

  getChildContext() {
    return {
      section: this.props.name,
      sectionUrl: this.examplesUrl,
    };
  }

  render() {
    const hasPropDocs = Boolean(this.props.propsDocs);

    return (
      <div className="card mt-3 border-dark">
        <div className="card-header d-flex bg-dark text-white align-items-center justify-content-between">
          <h5 className="mb-0">{this.props.name}</h5>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink to={this.infoUrl} className="nav-link">
                Info
              </NavLink>
            </li>

            {hasPropDocs && (
              <li className="nav-item">
                <NavLink to={this.propsUrl} className="nav-link">
                  Props
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink to={this.examplesUrl} className="nav-link">
                Examples
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route
            path={this.infoUrl}
            render={() => (
              <div className="card-body">
                <MarkdownView
                  className="card-text"
                  source={this.props.description}
                />
              </div>
            )}
          />

          {hasPropDocs && (
            <Route
              path={this.propsUrl}
              render={() => <PropsTable docs={this.props.propsDocs} />}
            />
          )}

          <Route
            path={this.examplesUrl}
            render={() => (
              <div className="card-body">
                <div className="card-text">{this.props.children}</div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

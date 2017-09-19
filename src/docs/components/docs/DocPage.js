import React from "react";
import PropTypes from "prop-types";
import kebabCase from "lodash/kebabCase";
import { NavLink, Route, Switch } from "react-router-dom";
import SourceView from "./SourceView";

export default class DocPage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    filePath: PropTypes.string.isRequired,
  };

  static contextTypes = {
    section: PropTypes.string.isRequired,
    sectionUrl: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.title = [context.section, props.name].join(" | ");
    this.url = [context.sectionUrl, kebabCase(props.name)].join("/");
    this.sourceUrl = [this.url, "source"].join("/");
  }

  render() {
    const { name } = this.props;

    return (
      <div className="mb-3">
        <ul className="nav nav-pills mb-3">
          <li className="nav-item">
            <NavLink exact to={this.url} className="nav-link">
              {name}
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={this.sourceUrl} className="nav-link">
              {name} Source
            </NavLink>
          </li>
        </ul>

        <Switch>
          <Route exact path={this.url} component={this.props.component} />
          <Route
            exact
            path={this.sourceUrl}
            render={() => <SourceView source={this.props.source} />}
          />
        </Switch>
      </div>
    );
  }
}

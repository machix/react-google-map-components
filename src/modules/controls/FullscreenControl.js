import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";
import { ControlPositionType } from "../internal/Props";
import { ControlManager } from "./ControlManager";

export class FullscreenControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ControlManager("fullscreenControl", context.mapManager);
  }

  componentDidMount() {
    this.manager.attach(this.props);
  }

  componentDidUpdate(prevProps) {
    this.manager.update(prevProps, this.props);
  }

  componentWillUnmount() {
    this.manager.detach();
  }

  render() {
    return null;
  }
}

FullscreenControl.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  FullscreenControl.propTypes = {
    position: ControlPositionType,
  };
}

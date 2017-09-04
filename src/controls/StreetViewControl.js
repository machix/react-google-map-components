import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";
import { ControlPositionType } from "../internal/Props";
import { ControlManager } from "./ControlManager";

export class StreetViewControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ControlManager("streetViewControl", context.mapManager);
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

StreetViewControl.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

if (__DEV__) {
  StreetViewControl.propTypes = {
    position: ControlPositionType,
  };
}

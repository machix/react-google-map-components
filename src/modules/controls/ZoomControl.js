import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";
import { ControlPositionType } from "../internal/Props";
import { ControlManager } from "./ControlManager";

export class ZoomControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ControlManager("zoomControl", context.mapManager);
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

ZoomControl.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  ZoomControl.propTypes = {
    /**
     * Position id. Used to specify the position of the control on the map.
     */
    position: ControlPositionType,
  };
}

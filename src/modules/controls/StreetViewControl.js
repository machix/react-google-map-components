import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { ControlPositionType } from "../internal/Props";
import { ControlManager } from "./ControlManager";

export class StreetViewControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ControlManager("streetViewControl", context.mapContext);
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
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  StreetViewControl.propTypes = {
    /**
     * Position id. Used to specify the position of the control on the map.
     */
    position: ControlPositionType,
  };
}

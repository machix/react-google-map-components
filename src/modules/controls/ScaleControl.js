import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { ControlManager } from "./ControlManager";

export class ScaleControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ControlManager("scaleControl", context.mapContext);
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

ScaleControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

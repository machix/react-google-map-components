import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";
import { AnimationManager } from "./AnimationManager";
import { LatLngType } from "../internal/Props";
import { isEqualProps } from "../internal/Utils";

export class PanToBounds extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapManager);
  }

  componentDidMount() {
    this.manager.panToBounds(this.props.latLngBounds);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqualProps(this.props.latLngBounds, nextProps.latLngBounds);
  }

  componentDidUpdate() {
    this.manager.panToBounds(this.props.latLngBounds);
  }

  render() {
    return null;
  }
}

PanToBounds.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanToBounds.propTypes = {
    latLngBounds: PropTypes.arrayOf(LatLngType).isRequired,
  };
}

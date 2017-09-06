import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";
import { AnimationManager } from "./AnimationManager";
import { LatLngType } from "../internal/Props";
import { isEqualProps } from "../internal/Utils";

export class PanToBoundsAnimation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapManager);
  }

  componentDidMount() {
    this.manager.panToBounds(this.props.latLngBounds);
  }

  componentDidUpdate(prevProps) {
    const { latLngBounds } = this.props;

    if (!isEqualProps(prevProps.latLngBounds, latLngBounds)) {
      this.manager.panToBounds(latLngBounds);
    }
  }

  render() {
    return null;
  }
}

PanToBoundsAnimation.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanToBoundsAnimation.propTypes = {
    latLngBounds: PropTypes.arrayOf(LatLngType).isRequired,
  };
}

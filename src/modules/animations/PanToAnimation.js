import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";
import { AnimationManager } from "./AnimationManager";
import { LatLngType } from "../internal/Props";
import { isEqualProps } from "../internal/Utils";

export class PanToAnimation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapManager);
  }

  componentDidMount() {
    this.manager.panTo(this.props.latLng);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqualProps(this.props.latLng, nextProps.latLng);
  }

  componentDidUpdate() {
    this.manager.panTo(this.props.latLng);
  }

  render() {
    return null;
  }
}

PanToAnimation.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanToAnimation.propTypes = {
    latLng: LatLngType.isRequired,
  };
}

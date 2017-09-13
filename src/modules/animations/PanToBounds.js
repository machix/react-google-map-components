import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { AnimationManager } from "./AnimationManager";
import { LatLngType } from "../internal/Props";
import { isEqualProps } from "../internal/Utils";

export class PanToBounds extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapContext);
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
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanToBounds.propTypes = {
    latLngBounds: PropTypes.arrayOf(LatLngType).isRequired,
  };
}

import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { AnimationManager } from "./AnimationManager";
import { LatLngType } from "../internal/Props";
import { isEqualProps } from "../internal/Utils";

export class PanTo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapContext);
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

PanTo.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanTo.propTypes = {
    latLng: LatLngType.isRequired,
  };
}

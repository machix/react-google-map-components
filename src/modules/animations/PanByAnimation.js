import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";
import { AnimationManager } from "./AnimationManager";

export class PanByAnimation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapManager);
  }

  componentDidMount() {
    const { x, y } = this.props;

    this.manager.panBy(x, y);
  }

  componentDidUpdate(prevProps) {
    const { x, y } = this.props;

    if (prevProps.x !== x || prevProps.y !== y) {
      this.manager.panBy(x, y);
    }
  }

  render() {
    return null;
  }
}

PanByAnimation.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanByAnimation.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };
}

import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { AnimationManager } from "./AnimationManager";

export class PanBy extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapContext);
  }

  componentDidMount() {
    const { x, y } = this.props;

    this.manager.panBy(x, y);
  }

  shouldComponentUpdate(nextProps) {
    const { x, y } = this.props;

    return nextProps.x !== x || nextProps.y !== y;
  }

  componentDidUpdate() {
    const { x, y } = this.props;

    this.manager.panBy(x, y);
  }

  render() {
    return null;
  }
}

PanBy.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanBy.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };
}

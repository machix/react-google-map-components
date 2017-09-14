import PropTypes from "prop-types";

import React from "react";
import { MapContext } from "../internal/MapContext";
import { ControlPositionType, OverlayType } from "../internal/Props";
import { createListeners } from "../internal/Utils";
import DrawingControlEvents from "./DrawingControlEvents";
import { DrawingControlManager } from "./DrawingControlManager";

export class DrawingControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new DrawingControlManager(context.mapContext);
  }

  componentDidMount() {
    const listeners = createListeners(DrawingControlEvents, x => this.props[x]);

    this.manager.attach(this.props, listeners);
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

DrawingControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  DrawingControl.propTypes = {
    /**
     * Position id. Used to specify the position of the control on the map.
     */
    position: ControlPositionType,

    /**
     * The drawing modes to display in the drawing control, in the order in which they are to be displayed.
     * The hand icon (which corresponds to the null drawing mode) is always available and is not to be specified in this array.
     */
    drawingModes: PropTypes.arrayOf(OverlayType),

    /**
     * This handler is called when the user has finished drawing a circle.
     */
    onCircleComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a marker.
     */
    onMarkerComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing an overlay of any type.
     */
    onOverlayComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a polygon.
     */
    onPolygonComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a polyline.
     */
    onPolylineComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a rectangle.
     */
    onRectangleComplete: PropTypes.func,
  };
}

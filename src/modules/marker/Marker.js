import PropTypes from "prop-types";
import React from "react";
import { MapManager } from "../internal/MapManager";

import {
  AnimationType,
  LatLngType,
  MarkerLabelType,
  MarkerShapeType,
  PointType,
} from "../internal/Props";
import { forEachMarkerEvent } from "./MarkerHandlers";
import { MarkerManager } from "./MarkerManager";

export class Marker extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new MarkerManager(props, context.mapManager);
  }

  componentDidMount() {
    this.manager.attach();

    forEachMarkerEvent((event, handler) => {
      this.manager.addListener(event, x => {
        const fn = this.props[handler];

        if (fn) {
          fn(x);
        }
      });
    });
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

Marker.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  Marker.propTypes = {
    /**
     * Marker position.
     */
    position: LatLngType.isRequired,

    /**
     * Rollover text.
     */
    title: PropTypes.string,

    /**
     * If true, the marker is visible.
     */
    visible: PropTypes.bool,

    /**
     * If true, the marker receives mouse and touch events. Default value is true.
     */
    clickable: PropTypes.bool,

    /**
     * If true, the marker can be dragged. Default value is false.
     */
    draggable: PropTypes.bool,

    /**
     * If false, disables cross that appears beneath the marker when dragging. This option is true by default.
     */
    crossOnDrag: PropTypes.bool,

    //
    // Style
    //

    /**
     * The offset from the marker's position to the tip of an InfoWindow that has been opened with the marker as anchor.
     */
    anchorPoint: PointType,

    /**
     * Which animation to play when marker is added to a map.
     */
    animation: AnimationType,

    /**
     * Mouse cursor to show on hover.
     */
    cursor: PropTypes.string,

    /**
     * Icon for the foreground.
     * If a string is provided, it is treated as though it were an `Icon` with the string as `url`.
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /**
     * Adds a label to the marker. The label can either be a string, or a MarkerLabel object.
     */
    label: PropTypes.oneOfType([PropTypes.string, MarkerLabelType]),

    /**
     * The marker's opacity between 0.0 and 1.0.
     */
    opacity: PropTypes.number,

    /**
     * Optimization renders many markers as a single static element. Optimized rendering is enabled by default.
     * Disable optimized rendering for animated GIFs or PNGs,
     * or when each marker must be rendered as a separate DOM element (advanced usage only).
     */
    optimized: PropTypes.bool,

    /**
     * Optimization renders many markers as a single static element. Optimized rendering is enabled by default.
     * Disable optimized rendering for animated GIFs or PNGs,
     * or when each marker must be rendered as a separate DOM element (advanced usage only).
     */
    shape: MarkerShapeType,

    /**
     * All markers are displayed on the map in order of their zIndex,
     * with higher values displaying in front of markers with lower values.
     * By default, markers are displayed according to their vertical position on screen,
     * with lower markers appearing in front of markers further up the screen.
     */
    zIndex: PropTypes.number,

    //
    // Events
    //

    /**
     * This handlers is called when the marker icon was clicked.
     */
    onClick: PropTypes.func,
    /**
     * This handlers is called when the marker icon was double clicked.
     */
    onDoubleClick: PropTypes.func,
    /**
     * This handlers is called when the marker icon was clicked.
     */
    onRightClick: PropTypes.func,

    /**
     * This handlers is called for a mouse down on the marker.
     */
    onMouseDown: PropTypes.func,
    /**
     * This handlers is called when the mouse leaves the area of the marker icon.
     */
    onMouseOut: PropTypes.func,
    /**
     * This handlers is called when the mouse enters the area of the marker icon.
     */
    onMouseOver: PropTypes.func,
    /**
     * This handlers is called when for a mouse up on the marker.
     */
    onMouseUp: PropTypes.func,

    /**
     * This handlers is called when the marker icon was clicked.
     */
    onDrag: PropTypes.func,
    /**
     * This handlers is called when the marker icon was clicked.
     */
    onDragStart: PropTypes.func,
    /**
     * This handlers is called when the marker icon was clicked.
     */
    onDragEnd: PropTypes.func,

    /**
     * This handlers is called when the marker position property changes.
     */
    onPositionChanged: PropTypes.func,
  };
}

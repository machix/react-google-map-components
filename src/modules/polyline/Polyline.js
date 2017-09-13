import PropTypes from "prop-types";
import React from "react";
import GenericEvents from "../internal/GenericEvents";
import { MapContext } from "../internal/MapContext";
import { LatLngType } from "../internal/Props";
import { createListeners } from "../internal/Utils";
import { PolylineManager } from "./PolylineManager";

export class Polyline extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new PolylineManager(props, context.mapContext);
  }

  componentDidMount() {
    const listeners = createListeners(GenericEvents, x => this.props[x]);

    this.manager.attach(listeners);
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

Polyline.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  Polyline.propTypes = {
    /**
     * If set to true, the user can drag this shape over the map.
     * The geodesic property defines the mode of dragging.
     *
     * Defaults to false.
     */
    draggable: PropTypes.bool,

    /**
     * Indicates whether this Polyline handles mouse events.
     *
     * Defaults to true.
     */
    clickable: PropTypes.bool,

    /**
     * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth.
     * When false, edges of the polygon are rendered as straight lines in screen space.
     * Note that the shape of a geodesic polygon may appear to change when dragged,
     * as the dimensions are maintained relative to the surface of the earth.
     *
     * Defaults to false.
     */
    geodesic: PropTypes.bool,

    /**
     * Type: Array<IconSequence>
     *
     * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#IconSequence
     *
     * The icons to be rendered along the polyline.
     */
    icons: PropTypes.array,

    /**
     * The ordered sequence of coordinates of the Polyline.
     */
    path: PropTypes.arrayOf(LatLngType),

    /**
     * The stroke color. All CSS3 colors are supported except for extended named colors.
     */
    strokeColor: PropTypes.string,

    /**
     * The stroke opacity between 0.0 and 1.0.
     */
    strokeOpacity: PropTypes.number,

    /**
     * The stroke width in pixels.
     */
    strokeWeight: PropTypes.number,

    /**
     * Whether this polyline is visible on the map.
     *
     * Defaults to true.
     */
    visible: PropTypes.bool,

    /**
     * The zIndex compared to other polys.
     */
    zIndex: PropTypes.number,

    //
    // Events
    //

    /**
     * This handler is fired when the DOM click handlers is fired on the Polyline.
     */
    onClick: PropTypes.func,
    /**
     * This handler is fired when the DOM dblclick handlers is fired on the Polyline.
     */
    onDoubleClick: PropTypes.func,
    /**
     * This handler is fired when the Polyline is right-clicked on.
     */
    onRightClick: PropTypes.func,

    /**
     * This handler is fired on Polyline mouseout.
     */
    onMouseOut: PropTypes.func,
    /**
     * This handler is fired on Polyline mouseover.
     */
    onMouseOver: PropTypes.func,

    /**
     * This handler is fired when the DOM mousemove handlers is fired on the Polyline.
     */
    onMouseMove: PropTypes.func,
    /**
     * This handler is fired when the DOM mousedown handlers is fired on the Polyline.
     */
    onMouseDown: PropTypes.func,
    /**
     * This handler is fired when the DOM mouseup handlers is fired on the Polyline.
     */
    onMouseUp: PropTypes.func,

    /**
     * This handler is repeatedly fired while the user drags the polyline.
     */
    onDrag: PropTypes.func,
    /**
     * This handler is fired when the user starts dragging the polyline.
     */
    onDragStart: PropTypes.func,
    /**
     * This handler is fired when the user stops dragging the polyline.
     */
    onDragEnd: PropTypes.func,
  };
}

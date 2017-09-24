import React from "react";
import PropTypes from "prop-types";

import fpPick from "lodash/fp/pick";

import MarkerEvents from "./MarkerEvents";
import { MarkerContext } from "./MarkerContext";

import { MapContext } from "../internal/MapContext";
import { createListeners, getChangedProps } from "../internal/Utils";

const pickProps = fpPick([
  "position",
  "title",
  "visible",
  "clickable",
  "draggable",
  "crossOnDrag",
  "anchorPoint",
  "animation",
  "cursor",
  "icon",
  "label",
  "opacity",
  "optimized",
  "shape",
  "zIndex",
]);

/**
 * Draws `google.maps.Marker`.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, Marker } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <Marker position={props.center} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Marker](https://developers.google.com/maps/documentation/javascript/reference#Marker)
 * * [google.maps.MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions)
 */
export class Marker extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.marker = new context.mapContext.maps.Marker();
    this.markerContext = new MarkerContext(this.marker);
  }

  getChildContext() {
    return { markerContext: this.markerContext };
  }

  componentDidMount() {
    const marker = this.marker;
    const options = this.getOptions(this.props);

    marker.setValues(options);
    marker.setMap(this.context.mapContext.map);

    marker.addListener(MarkerEvents.onDragEnd, () => {
      marker.setPosition(this.props.position);
    });

    createListeners(
      MarkerEvents,
      x => this.props[x],
    ).forEach(([event, listener]) => {
      marker.addListener(event, listener);
    });
  }

  componentDidUpdate(prevProps) {
    const diff = getChangedProps(prevProps, this.props);

    if (diff) {
      const options = this.getOptions(diff);

      this.marker.setValues(options);
    }
  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.context.mapContext.maps.event.clearInstanceListeners(this.marker);
  }

  getOptions(props) {
    const options = pickProps(props);
    const ctx = this.context.mapContext;

    options.animation = ctx.getEnum("Animation", options.animation);

    if (React.isValidElement(options.icon)) {
      delete options.icon;
    }

    if (options.position) {
      options.position = ctx.createLatLng(options.position);
    }

    if (options.anchorPoint) {
      options.anchorPoint = ctx.createPoint(options.anchorPoint);
    }

    return options;
  }

  render() {
    return React.isValidElement(this.props.icon) ? this.props.icon : null;
  }
}

Marker.childContextTypes = {
  markerContext: PropTypes.instanceOf(MarkerContext).isRequired,
};

Marker.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

Marker.defaultProps = {
  visible: true,
  clickable: true,
  draggable: false,
  crossOnDrag: true,
  animation: "NONE",
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  Marker.propTypes = {
    /**
     * Marker position.
     */
    position: PropTypes.shape({
      /**
       * The latitude in degrees.
       */
      lat: PropTypes.number.isRequired,
      /**
       * The longitude in degrees.
       */
      lng: PropTypes.number.isRequired,
    }).isRequired,

    /**
     * Rollover text.
     */
    title: PropTypes.string,

    /**
     * If `true`, the marker is visible.
     */
    visible: PropTypes.bool,

    /**
     * If `true`, the marker receives mouse and touch events.
     */
    clickable: PropTypes.bool,

    /**
     * If `true`, the marker can be dragged.
     */
    draggable: PropTypes.bool,

    /**
     * If `false`, disables cross that appears beneath the marker when dragging.
     */
    crossOnDrag: PropTypes.bool,

    //
    // Style
    //

    /**
     * The offset from the marker's position to the tip of an InfoWindow that has been opened with the marker as anchor.
     */
    anchorPoint: PropTypes.shape({
      /**
       * The X coordinate.
       */
      x: PropTypes.number.isRequired,
      /**
       * The Y coordinate.
       */
      y: PropTypes.number.isRequired,
    }),

    /**
     * Which animation to play when marker is added to a map.
     */
    animation: PropTypes.oneOf(["NONE", "BOUNCE", "DROP"]),

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
     * Adds a label to the marker.
     *
     * The label can either be a `string`, or a [google.maps.MarkerLabel](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerLabel) object.
     */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        /**
         * The color of the label text.
         *
         * Default color is black.
         */
        color: PropTypes.string,
        /**
         * The font family of the label text.
         *
         * Equivalent to the CSS font-family property.
         */
        fontFamily: PropTypes.string,
        /**
         * The font size of the label text.
         *
         * Equivalent to the CSS font-size property.
         *
         * Default size is 14px.
         */
        fontSize: PropTypes.string,
        /**
         * The font weight of the label text
         *
         * Equivalent to the CSS font-weight property.
         */
        fontWeight: PropTypes.string,
        /**
         * The text to be displayed in the label.
         */
        text: PropTypes.string,
      }),
    ]),

    /**
     * The marker's opacity between 0.0 and 1.0.
     */
    opacity: PropTypes.number,

    /**
     * Optimization renders many markers as a single static element.
     *
     * Optimized rendering is enabled by default.
     *
     * Disable optimized rendering for animated GIFs or PNGs, or when each marker must
     * be rendered as a separate DOM element (advanced usage only).
     */
    optimized: PropTypes.bool,

    /**
     * Optimization renders many markers as a single static element. Optimized rendering is enabled by default.
     * Disable optimized rendering for animated GIFs or PNGs,
     * or when each marker must be rendered as a separate DOM element (advanced usage only).
     *
     * The coordinates depend on the value of type as follows:
     * * `circle`: coords is `[x1, y1, r]` where x1,y2 are the coordinates of the center of the circle, and r is the radius of the circle.
     * * `poly`: coords is `[x1,y1,x2,y2...xn,yn]` where each x,y pair contains the coordinates of one vertex of the polygon.
     * * `rect`: coords is `[x1,y1,x2,y2]` where x1,y1 are the coordinates of the upper-left corner of the rectangle and x2,y2 are the coordinates of the lower-right coordinates of the rectangle.
     *
     * See also: [Image maps coordinates specification](http://www.w3.org/TR/REC-html40/struct/objects.html#adef-coords)
     */
    shape: PropTypes.shape({
      /**
       * Specifies the pixel position of the shape
       * relative to the top-left corner
       * of the target image.
       */
      coords: PropTypes.arrayOf(PropTypes.number),

      /**
       * Describes the shape's type.
       */
      type: PropTypes.oneOf(["circle", "poly", "rect"]),
    }),

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
     * This handlers is called when the marker `position` property changes.
     */
    onPositionChanged: PropTypes.func,
  };
}

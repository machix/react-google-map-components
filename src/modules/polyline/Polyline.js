import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { createListeners, getChangedProps } from "../internal/Utils";
import { MapContext } from "../internal/MapContext";
import GenericEvents from "../internal/GenericEvents";

const pickProps = x =>
  _.pick(x, [
    "path",
    "icons",
    "zIndex",
    "visible",
    "geodesic",
    "clickable",
    "draggable",
    "strokeColor",
    "strokeWeight",
    "strokeOpacity",
  ]);

/**
 * Draws `google.maps.Polyline`.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, Polyline } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <Polyline path={[props.start, props.center, props.end]} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Polyline](https://developers.google.com/maps/documentation/javascript/reference#Polyline)
 * * [google.maps.PolylineOptions](https://developers.google.com/maps/documentation/javascript/reference#PolylineOptions)
 */
export class Polyline extends React.Component {
  componentWillMount() {
    const { mapContext } = this.context;

    const polyline = new mapContext.maps.Polyline();
    const options = pickProps(this.props);

    this.polyline = polyline;

    polyline.setValues(options);
    polyline.setMap(mapContext.map);

    polyline.addListener(GenericEvents.onDragEnd, event => {
      const path = polyline.getPath();

      if (path) {
        // eslint-disable-next-line no-param-reassign
        event.path = path;
      }

      polyline.setPath(this.props.path);
    });

    createListeners(GenericEvents, x => this.props[x]).forEach(
      ([event, listener]) => {
        polyline.addListener(event, listener);
      },
    );
  }

  componentWillUpdate(nextProps) {
    const next = pickProps(nextProps);
    const prev = pickProps(this.props);
    const diff = getChangedProps(prev, next);

    if (diff) {
      this.polyline.setValues(diff);
    }
  }

  componentWillUnmount() {
    this.polyline.setMap(null);
    this.context.mapContext.maps.event.clearInstanceListeners(this.polyline);
  }

  render() {
    return null;
  }
}

Polyline.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

Polyline.defaultProps = {
  draggable: false,
  clickable: true,
  geodesic: false,
  visible: true,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  Polyline.propTypes = {
    /**
     * If set to true, the user can drag this shape over the map.
     *
     * The `geodesic` property defines the mode of dragging.
     */
    draggable: PropTypes.bool,

    /**
     * Indicates whether this `Polyline` handles mouse events.
     */
    clickable: PropTypes.bool,

    /**
     * When `true`, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth.
     * When `false`, edges of the polygon are rendered as straight lines in screen space.
     *
     * Note that the shape of a geodesic polygon may appear to change when dragged,
     * as the dimensions are maintained relative to the surface of the earth.
     */
    geodesic: PropTypes.bool,

    /**
     * Whether this `Polyline` is visible on the map.
     */
    visible: PropTypes.bool,

    /**
     * The ordered sequence of coordinates of the `Polyline`.
     */
    path: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * The latitude in degrees.
         */
        lat: PropTypes.number.isRequired,

        /**
         * The longitude in degrees.
         */
        lng: PropTypes.number.isRequired,
      }),
    ).isRequired,

    //
    // Style
    //

    /**
     * The stroke color.
     *
     * All CSS3 colors are supported except for extended named colors.
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
     * The zIndex compared to other polys.
     */
    zIndex: PropTypes.number,

    //
    // Events
    //

    /**
     * This handler is fired when the DOM `click` handlers is fired
     * on the `Polyline`.
     */
    onClick: PropTypes.func,
    /**
     * This handler is fired when the DOM `dblclick` handlers is fired
     * on the `Polyline`.
     */
    onDoubleClick: PropTypes.func,
    /**
     * This handler is fired when the `Polyline` is right-clicked on.
     */
    onRightClick: PropTypes.func,

    /**
     * This handler is fired on `mouseout` handlers is fired on `Polyline`.
     */
    onMouseOut: PropTypes.func,
    /**
     * This handler is fired on `mouseover` handlers is fired on `Polyline`.
     */
    onMouseOver: PropTypes.func,

    /**
     * This handler is fired when the DOM `mousemove` handlers is fired
     * on `Polyline`.
     */
    onMouseMove: PropTypes.func,
    /**
     * This handler is fired when the DOM `mousedown` handlers is fired
     * on `Polyline`.
     */
    onMouseDown: PropTypes.func,
    /**
     * This handler is fired when the DOM `mouseup` handlers is fired
     * on `Polyline`.
     */
    onMouseUp: PropTypes.func,

    /**
     * This handler is repeatedly fired while the user drags the `Polyline`.
     */
    onDrag: PropTypes.func,
    /**
     * This handler is fired when the user starts dragging the `Polyline`.
     */
    onDragStart: PropTypes.func,
    /**
     * This handler is fired when the user stops dragging the `Polyline`.
     */
    onDragEnd: PropTypes.func,
  };
}

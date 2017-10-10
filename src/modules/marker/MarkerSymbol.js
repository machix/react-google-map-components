import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import fpPick from "lodash/fp/pick";
import { MarkerContext } from "./MarkerContext";
import { MapContext } from "../internal/MapContext";

const pickProps = fpPick([
  "path",
  "rotation",
  "scale",
  "anchor",
  "labelOrigin",
  "fillColor",
  "fillOpacity",
  "strokeColor",
  "strokeOpacity",
  "strokeWeight",
]);

/**
 * Defines icon options of `Marker` component.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, Marker, MarkerSymbol } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <Marker
 *         position={props.center}
 *         icon={<MarkerSymbol path={props.markerPath} />}
 *       />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Symbol](https://developers.google.com/maps/documentation/javascript/reference#Symbol)
 */
export class MarkerSymbol extends React.Component {
  componentWillMount() {
    const { mapContext, markerContext: { marker } } = this.context;

    marker.setIcon(mapContext.createSymbol(this.props));
  }

  componentWillUpdate(nextProps) {
    const { mapContext, markerContext } = this.context;

    const nextIcon = pickProps(nextProps);
    const prevIcon = pickProps(this.props);

    if (!isEqual(prevIcon, nextIcon)) {
      markerContext.marker.setIcon(mapContext.createSymbol(nextIcon));
    }
  }

  render() {
    return null;
  }
}

MarkerSymbol.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
  markerContext: PropTypes.instanceOf(MarkerContext).isRequired,
};

MarkerSymbol.defaultProps = {
  rotation: 0,
  scale: 1,
  anchor: { x: 0, y: 0 },
  labelOrigin: { x: 0, y: 0 },
  fillColor: "black",
  fillOpacity: 0,
  strokeColor: "black",
  strokeOpacity: 1,
  strokeWeight: 1,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  MarkerSymbol.propTypes = {
    /**
     * Built-in symbol path, or a custom path expressed using
     * [SVG path notation](http://www.w3.org/TR/SVG/paths.html#PathData).
     */
    path: PropTypes.string.isRequired,

    /**
     * The angle by which to rotate the symbol, expressed clockwise in degrees.
     */
    rotation: PropTypes.number,

    /**
     * The amount by which the symbol is scaled in size.
     */
    scale: PropTypes.number,

    /**
     * The position of the symbol relative to the marker.
     * The coordinates of the symbol's path are translated left and up by the
     * anchor's x and y coordinates respectively.
     */
    anchor: PropTypes.shape({
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
     * The origin of the label relative to the origin of the path,
     * if label is supplied by the marker.
     */
    labelOrigin: PropTypes.shape({
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
     * The symbol's fill color.
     *
     * All CSS3 colors are supported except for extended named colors.
     */
    fillColor: PropTypes.string,

    /**
     * The symbol's fill opacity.
     */
    fillOpacity: PropTypes.number,

    /**
     * The symbol's stroke color.
     *
     * All CSS3 colors are supported except for extended named colors.
     */
    strokeColor: PropTypes.string,

    /**
     * The symbol's stroke opacity.
     */
    strokeOpacity: PropTypes.number,

    /**
     * The symbol's stroke weight.
     */
    strokeWeight: PropTypes.number,
  };
}

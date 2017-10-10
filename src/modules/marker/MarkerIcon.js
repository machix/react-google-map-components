import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import fpPick from "lodash/fp/pick";
import { MarkerContext } from "./MarkerContext";
import { MapContext } from "../internal/MapContext";

const pickProps = fpPick([
  "url",
  "anchor",
  "labelOrigin",
  "origin",
  "size",
  "scaledSize",
]);

/**
 * Defines icon options of `Marker` component.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, Marker, MarkerIcon } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <Marker
 *         position={props.center}
 *         icon={<MarkerIcon url={props.markerIcon} />}
 *       />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Icon](https://developers.google.com/maps/documentation/javascript/reference#Icon)
 */
export class MarkerIcon extends React.Component {
  componentWillMount() {
    const { mapContext, markerContext: { marker } } = this.context;

    marker.setIcon(mapContext.createIcon(this.props));
  }

  componentWillUpdate(nextProps) {
    const { mapContext, markerContext } = this.context;

    const nextIcon = pickProps(nextProps);
    const prevIcon = pickProps(this.props);

    if (!isEqual(prevIcon, nextIcon)) {
      markerContext.marker.setIcon(mapContext.createIcon(nextIcon));
    }
  }

  render() {
    return null;
  }
}

MarkerIcon.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
  markerContext: PropTypes.instanceOf(MarkerContext).isRequired,
};

MarkerIcon.defaultProps = {
  origin: { x: 0, y: 0 },
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  MarkerIcon.propTypes = {
    /**
     * The URL of the image or sprite sheet.
     */
    url: PropTypes.string.isRequired,

    /**
     * The position at which to anchor an image in correspondence to the location of the marker on the map.
     *
     * By default, the anchor is located along the center point of the bottom of the image.
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
     * The origin of the label relative to the top-left corner of the icon image, if a label is supplied by the marker.
     *
     * By default, the origin is located in the center point of the image.
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
     * The position of the image within a sprite, if any.
     */
    origin: PropTypes.shape({
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
     * The display size of the sprite or image.
     *
     * When using sprites, you must specify the sprite size.
     *
     * If the size is not provided, it will be set when the image loads.
     */
    size: PropTypes.shape({
      /**
       * The height along the y-axis, in pixels.
       */
      width: PropTypes.number.isRequired,
      /**
       * The width along the x-axis, in pixels.
       */
      height: PropTypes.number.isRequired,
    }),
    /**
     * The size of the entire image after scaling, if any.
     *
     * Use this property to stretch/shrink an image or a sprite.
     */
    scaledSize: PropTypes.shape({
      /**
       * The height along the y-axis, in pixels.
       */
      width: PropTypes.number.isRequired,
      /**
       * The width along the x-axis, in pixels.
       */
      height: PropTypes.number.isRequired,
    }),
  };
}

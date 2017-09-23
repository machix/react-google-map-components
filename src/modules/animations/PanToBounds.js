import React from "react";
import PropTypes from "prop-types";

import { isEqualProps } from "../internal/Utils";
import { MapContext } from "../internal/MapContext";

/**
 * Pans the map by the minimum amount necessary to contain the given `LatLngBounds`.
 * It makes no guarantee where on the map the bounds will be, except that as much of the
 * bounds as possible will be visible.
 *
 * The bounds will be positioned inside the area bounded by the map type and navigation
 * (pan, zoom, and Street View) controls, if they are present on the map.
 *
 * If the bounds is larger than the map, the map will be shifted to include the northwest
 * corner of the bounds.
 *
 * If the change in the map's position is less than both the width and height of the map,
 * the transition will be smoothly animated.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, PanToBounds } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <PanToBounds latLngBounds={props.bounds} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Map](https://developers.google.com/maps/documentation/javascript/reference#Map)
 */
export class PanToBounds extends React.Component {
  componentWillMount() {
    this.animate();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqualProps(this.props.latLngBounds, nextProps.latLngBounds);
  }

  componentWillUpdate(nextProps) {
    this.animate(nextProps);
  }

  animate({ latLngBounds } = this.props) {
    const { mapContext } = this.context;

    mapContext.map.panToBounds(mapContext.createLatLngBounds(latLngBounds));
  }

  render() {
    return null;
  }
}

PanToBounds.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanToBounds.propTypes = {
    /**
     * Array of positions that will be used to generate `LatLngBounds` object.
     *
     * See also: [google.maps.LatLngBounds](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngBounds)
     */
    latLngBounds: PropTypes.arrayOf(
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
  };
}

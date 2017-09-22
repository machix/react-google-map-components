import React from "react";
import PropTypes from "prop-types";

import { isEqualProps } from "../internal/Utils";
import { MapContext } from "../internal/MapContext";

/**
 * Sets the `viewport` to contain the given `bounds`.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, FitBounds } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <FitBounds latLngBounds={props.bounds} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Map](https://developers.google.com/maps/documentation/javascript/reference#Map)
 */
export class FitBounds extends React.Component {
  componentDidMount() {
    this.animate();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqualProps(this.props.latLngBounds, nextProps.latLngBounds);
  }

  componentDidUpdate() {
    this.animate();
  }

  animate() {
    const { mapContext } = this.context;

    mapContext.map.fitBounds(
      mapContext.createLatLngBounds(this.props.latLngBounds),
    );
  }

  render() {
    return null;
  }
}

FitBounds.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  FitBounds.propTypes = {
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

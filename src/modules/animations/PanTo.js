import React from "react";
import PropTypes from "prop-types";

import { MapContext } from "../internal/MapContext";
import { isEqualProps } from "../internal/Utils";

/**
 * Changes the center of the map to the given `latLng`.
 *
 * If the change is less than both the width and height of the map,
 * the transition will be smoothly animated.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, PanTo } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <PanTo latLng={props.panPosition} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Map](https://developers.google.com/maps/documentation/javascript/reference#Map)
 */
export class PanTo extends React.Component {
  componentWillMount() {
    this.animate();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqualProps(this.props.latLng, nextProps.latLng);
  }

  componentWillUpdate(nextProps) {
    this.animate(nextProps);
  }

  animate({ latLng } = this.props) {
    this.context.mapContext.map.panTo(latLng);
  }

  render() {
    return null;
  }
}

PanTo.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanTo.propTypes = {
    /**
     * Defines the next map center position.
     */
    latLng: PropTypes.shape({
      /**
       * The latitude in degrees.
       */
      lat: PropTypes.number.isRequired,
      /**
       * The longitude in degrees.
       */
      lng: PropTypes.number.isRequired,
    }).isRequired,
  };
}

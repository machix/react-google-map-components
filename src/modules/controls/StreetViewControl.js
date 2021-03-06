import React from "react";
import PropTypes from "prop-types";

import { Control } from "./Control";
import { MapContext } from "../internal/MapContext";

/**
 * Controls display options of Street View Pegman control.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, FullscreenControl } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <FullscreenControl />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.FullscreenControlOptions](https://developers.google.com/maps/documentation/javascript/reference#FullscreenControlOptions)
 */
export function StreetViewControl(props, context) {
  return (
    <Control
      name="streetViewControl"
      options={{
        position: context.mapContext.getEnum("ControlPosition", props.position),
      }}
    />
  );
}

StreetViewControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

StreetViewControl.defaultProps = {
  position: "TOP_LEFT",
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  StreetViewControl.propTypes = {
    /**
     * Position id.
     *
     * Used to specify the position of the control on the map.
     */
    position: PropTypes.oneOf([
      "BOTTOM_CENTER",
      "BOTTOM_LEFT",
      "BOTTOM_RIGHT",
      "LEFT_BOTTOM",
      "LEFT_CENTER",
      "LEFT_TOP",
      "RIGHT_BOTTOM",
      "RIGHT_CENTER",
      "RIGHT_TOP",
      "TOP_CENTER",
      "TOP_LEFT",
      "TOP_RIGHT",
    ]),
  };
}

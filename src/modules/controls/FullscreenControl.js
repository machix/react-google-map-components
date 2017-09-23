import React from "react";
import PropTypes from "prop-types";

import { Control } from "./Control";
import { MapContext } from "../internal/MapContext";

/**
 * Controls display options of fullscreen control.
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
export function FullscreenControl(props, context) {
  return (
    <Control
      name="fullscreenControl"
      options={{
        position: context.mapContext.getEnum("ControlPosition", props.position),
      }}
    />
  );
}

FullscreenControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

FullscreenControl.defaultProps = {
  position: "RIGHT_TOP",
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  FullscreenControl.propTypes = {
    /**
     * Position id.
     *
     * Used to specify the position of the control on the map.
     *
     * See also: [google.maps.ControlPosition](https://developers.google.com/maps/documentation/javascript/reference#ControlPosition)
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

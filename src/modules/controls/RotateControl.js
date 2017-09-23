import React from "react";
import PropTypes from "prop-types";

import { Control } from "./Control";
import { MapContext } from "../internal/MapContext";

/**
 * Controls display options of Rotate control.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, RotateControl } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <RotateControl />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.RotateControlOptions](https://developers.google.com/maps/documentation/javascript/reference#RotateControlOptions)
 */
export function RotateControl(props, context) {
  return (
    <Control
      name="rotateControl"
      options={{
        position: context.mapContext.getEnum("ControlPosition", props.position),
      }}
    />
  );
}

RotateControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

RotateControl.defaultProps = {
  position: "TOP_LEFT",
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  RotateControl.propTypes = {
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

import React from "react";
import PropTypes from "prop-types";

import { Control } from "./Control";
import { MapContext } from "../internal/MapContext";

/**
 * Controls display options of zoom control.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, ZoomControl } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <ZoomControl />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.ZoomControlOptions](https://developers.google.com/maps/documentation/javascript/reference#ZoomControlOptions)
 */
export function ZoomControl(props, context) {
  return (
    <Control
      name="zoomControl"
      options={{
        position: context.mapContext.getEnum("ControlPosition", props.position),
      }}
    />
  );
}

ZoomControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

ZoomControl.defaultProps = {
  position: "TOP_LEFT",
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  ZoomControl.propTypes = {
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

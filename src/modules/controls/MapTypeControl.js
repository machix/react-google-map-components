import React from "react";
import map from "lodash/map";
import PropTypes from "prop-types";
import { Control } from "./Control";
import { MapContext } from "../internal/MapContext";

/**
 * Controls display options Map type control.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, MapTypeControl } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <MapTypeControl />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.MapTypeControlOptions](https://developers.google.com/maps/documentation/javascript/reference#MapTypeControlOptions)
 */
export function MapTypeControl(props, context) {
  const { mapContext } = context;

  return (
    <Control
      name="mapTypeControl"
      options={{
        position: mapContext.getEnum("ControlPosition", props.position),
        style: mapContext.getEnum("MapTypeControlStyle", props.controlStyle),
        mapTypeIds: map(props.mapTypeIds, x =>
          mapContext.getEnum("MapTypeId", x),
        ),
      }}
    />
  );
}

MapTypeControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

MapTypeControl.defaultProps = {
  position: "TOP_RIGHT",
  controlStyle: "DEFAULT",
  mapTypeIds: ["HYBRID", "ROADMAP", "SATELLITE", "TERRAIN"],
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  MapTypeControl.propTypes = {
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

    /**
     * Style id.
     *
     * Used to select what style of map type control to display.
     *
     * See also: [google.maps.MapTypeControlStyle](https://developers.google.com/maps/documentation/javascript/reference#MapTypeControlStyle)
     */
    controlStyle: PropTypes.oneOf([
      "DEFAULT",
      "DROPDOWN_MENU",
      "HORIZONTAL_BAR",
    ]),

    /**
     * IDs of map types to show in the control.
     *
     * See also: [google.maps.MapTypeId](https://developers.google.com/maps/documentation/javascript/reference#MapTypeId)
     */
    mapTypeIds: PropTypes.arrayOf(
      PropTypes.oneOf(["HYBRID", "ROADMAP", "SATELLITE", "TERRAIN"]),
    ),
  };
}

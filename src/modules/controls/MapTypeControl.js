import map from "lodash/map";
import PropTypes from "prop-types";

import React from "react";
import { MapContext } from "../internal/MapContext";
import { ControlManager } from "./ControlManager";

export class MapTypeControlManager extends ControlManager {
  constructor(context: MapContext) {
    super("mapTypeControl", context);
  }

  getOptions(props) {
    const ctx = this.context;
    const options = super.getOptions(props);

    options.style = ctx.getEnum("MapTypeControlStyle", props.style);

    if (props.mapTypeIds) {
      options.mapTypeIds = map(props.mapTypeIds, x =>
        ctx.getEnum("MapTypeId", x),
      );
    }

    return options;
  }
}

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
export class MapTypeControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new MapTypeControlManager(context.mapContext);
  }

  componentDidMount() {
    this.manager.attach(this.props);
  }

  componentDidUpdate(prevProps) {
    this.manager.update(prevProps, this.props);
  }

  componentWillUnmount() {
    this.manager.detach();
  }

  render() {
    return null;
  }
}

MapTypeControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

MapTypeControl.defaultProps = {
  position: "TOP_RIGHT",
  style: "DEFAULT",
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
    style: PropTypes.oneOf(["DEFAULT", "DROPDOWN_MENU", "HORIZONTAL_BAR"]),

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

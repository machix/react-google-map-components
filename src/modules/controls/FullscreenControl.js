import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { ControlManager } from "./ControlManager";

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
export class FullscreenControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ControlManager("fullscreenControl", context.mapContext);
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

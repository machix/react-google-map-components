import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";
import { CustomControlManager } from "./CustomControlManager";

/**
 * Controls display options of custom control.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, CustomControl } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <CustomControl>
 *         <button onClick={props.onControlClick}>
 *           Click Me
 *         </button>
 *       </CustomControl>
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [Custom Controls](https://developers.google.com/maps/documentation/javascript/examples/control-custom)
 */
export class CustomControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new CustomControlManager(
      context.mapContext,
      (element, container) => {
        ReactDOM.unstable_renderSubtreeIntoContainer(
          this,
          React.Children.only(element),
          container,
        );
      },
    );
  }

  componentDidMount() {
    this.manager.attach(this.props);
  }

  componentDidUpdate(prevProps) {
    this.manager.update(prevProps, this.props);
  }

  componentWillUnmount() {
    this.manager.detach(this.props);
  }

  render() {
    return null;
  }
}

CustomControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  CustomControl.propTypes = {
    /**
     * Content of control.
     */
    children: PropTypes.node.isRequired,

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
    ]).isRequired,
  };
}

import React from "react";
import PropTypes from "prop-types";

import { Portal } from "../internal/Portal";
import { MapContext } from "../internal/MapContext";

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
  componentWillMount() {
    this.div = document.createElement("div");

    this.mountControl();
  }

  shouldComponentUpdate(nextProps) {
    const { position, children } = this.props;

    return position !== nextProps.position || children !== nextProps.children;
  }

  componentWillUpdate(nextProps) {
    if (this.props.position !== nextProps.position) {
      // We need to remove control from old position first.
      this.unmountControl();

      // And only after that we can add control to new position.
      this.mountControl(nextProps);
    }
  }

  componentWillUnmount() {
    this.unmountControl();
  }

  getControls({ position } = this.props) {
    const { mapContext } = this.context;

    return mapContext.map.controls[
      mapContext.getEnum("ControlPosition", position)
    ];
  }

  mountControl(props) {
    const controls = this.getControls(props);

    if (controls) {
      const index = controls.indexOf(this.div);

      if (index === -1) {
        controls.push(this.div);
      }
    }
  }

  unmountControl(props) {
    const controls = this.getControls(props);

    if (controls) {
      const index = controls.indexOf(this.div);

      if (index !== -1) {
        controls.removeAt(index);
      }
    }
  }

  render() {
    const controls = this.getControls();

    return !controls ? null : (
      <Portal node={this.div}>{this.props.children}</Portal>
    );
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
    children: PropTypes.element.isRequired,

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

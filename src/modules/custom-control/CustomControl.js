import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

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
  constructor(props, context) {
    super(props, context);

    this.div = document.createElement("div");
  }

  componentDidMount() {
    this.mountControl();
    this.renderContent();
  }

  componentDidUpdate(prevProps) {
    const { position, children } = this.props;

    if (prevProps.position !== position) {
      // We need to remove control from old position first.
      this.unmountControl(prevProps.position);

      // And only after that we can add control to new position.
      this.mountControl();
    }

    if (prevProps.children !== children) {
      this.renderContent();
    }
  }

  componentWillUnmount() {
    this.unmountControl();
    ReactDOM.unmountComponentAtNode(this.div);
  }

  getControls(position = this.props.position) {
    const { mapContext } = this.context;

    return mapContext.map.controls[
      mapContext.getEnum("ControlPosition", position)
    ];
  }

  mountControl() {
    const controls = this.getControls();

    if (controls) {
      const index = controls.indexOf(this.div);

      if (index === -1) {
        controls.push(this.div);
      }
    }
  }

  unmountControl(position) {
    const controls = this.getControls(position);

    if (controls) {
      const index = controls.indexOf(this.div);

      if (index !== -1) {
        controls.removeAt(index);
      }
    }
  }

  renderContent() {
    const { children } = this.props;

    if (React.isValidElement(children)) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this.div);
    } else {
      ReactDOM.unmountComponentAtNode(this.div);
    }
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

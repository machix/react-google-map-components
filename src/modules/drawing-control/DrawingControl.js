import PropTypes from "prop-types";

import React from "react";
import { MapContext } from "../internal/MapContext";
import { createListeners } from "../internal/Utils";
import DrawingControlEvents from "./DrawingControlEvents";
import { DrawingControlManager } from "./DrawingControlManager";

/**
 * Controls display options of `google.maps.drawing.DrawingManager` control.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, DrawingControl } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <DrawingControl onOverlayComplete={props.onOverlayComplete} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.drawing.DrawingManager](https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManager)
 * * [google.maps.drawing.DrawingManagerOptions](https://developers.google.com/maps/documentation/javascript/3.exp/reference#DrawingManagerOptions)
 */
export class DrawingControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new DrawingControlManager(context.mapContext);
  }

  componentDidMount() {
    const listeners = createListeners(DrawingControlEvents, x => this.props[x]);

    this.manager.attach(this.props, listeners);
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

DrawingControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

DrawingControl.defaultProps = {
  position: "TOP_LEFT",
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  DrawingControl.propTypes = {
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

    /**
     * The drawing modes to display in the drawing control, in the order in
     * which they are to be displayed.
     *
     * The hand icon (which corresponds to the null drawing mode)
     * is always available and is not to be specified in this array.
     */
    drawingModes: PropTypes.arrayOf(
      PropTypes.oneOf(["circle", "marker", "polygon", "polyline", "rectangle"]),
    ),

    /**
     * This handler is called when the user has finished drawing a `circle`.
     */
    onCircleComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a `marker`.
     */
    onMarkerComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing an `overlay`
     * of any type.
     */
    onOverlayComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a `polygon`.
     */
    onPolygonComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a `polyline`.
     */
    onPolylineComplete: PropTypes.func,

    /**
     * This handler is called when the user has finished drawing a `rectangle`.
     */
    onRectangleComplete: PropTypes.func,
  };
}

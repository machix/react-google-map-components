import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import DrawingControlEvents from "./DrawingControlEvents";
import { isEqualProps, createListeners } from "../internal/Utils";
import { MapContext } from "../internal/MapContext";

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
  componentWillMount() {
    const { mapContext } = this.context;

    const options = this.getOptions();
    const drawingManager = new mapContext.maps.drawing.DrawingManager();

    this.drawingManager = drawingManager;

    drawingManager.setValues(options);
    drawingManager.setMap(mapContext.map);

    drawingManager.addListener(DrawingControlEvents.onOverlayComplete, x => {
      x.overlay.setMap(null);
    });

    createListeners(DrawingControlEvents, x => this.props[x]).forEach(
      ([event, listener]) => {
        drawingManager.addListener(event, listener);
      },
    );
  }

  componentWillUpdate(nextProps) {
    const prevOptions = this.getOptions();
    const nextOptions = this.getOptions(nextProps);

    if (!isEqualProps(prevOptions, nextOptions)) {
      this.drawingManager.setValues(nextOptions);
    }
  }

  componentWillUnmount() {
    this.drawingManager.setMap(null);
  }

  getOptions({ position, drawingModes } = this.props) {
    const { mapContext } = this.context;

    return {
      drawingControl: true,
      drawingControlOptions: {
        position: mapContext.getEnum("ControlPosition", position),
        drawingModes: _.map(drawingModes, x =>
          mapContext.getEnum("drawing.OverlayType", x),
        ),
      },
    };
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
  drawingModes: ["circle", "marker", "polygon", "polyline", "rectangle"],
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
    ]),

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

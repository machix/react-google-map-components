import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";
import { createListeners } from "../internal/Utils";
import InfoWindowEvents from "./InfoWindowEvents";
import { InfoWindowManager } from "./InfoWindowManager";

/**
 * Draws `google.maps.InfoWindow`.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, InfoWindow } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <InfoWindow position={props.center}>
 *         <div>Hello World!</div>
 *       </InfoWindow>
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.InfoWindow](https://developers.google.com/maps/documentation/javascript/reference#InfoWindow)
 * * [google.maps.InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference#InfoWindowOptions)
 */
export class InfoWindow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new InfoWindowManager(
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
    const listeners = createListeners(InfoWindowEvents, x => this.props[x]);

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

InfoWindow.defaultProps = {
  open: true,
  disableAutoPan: false,
};

InfoWindow.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  InfoWindow.propTypes = {
    /**
     * 	Controls whether the `InfoWindow` is opened or not.
     */
    open: PropTypes.bool,

    /**
     * This handler is called when the close button was clicked.
     */
    onCloseClick: PropTypes.func,

    /**
     * The LatLng at which to display this `InfoWindow`.
     */
    position: PropTypes.shape({
      /**
       * The latitude in degrees.
       */
      lat: PropTypes.number.isRequired,
      /**
       * The longitude in degrees.
       */
      lng: PropTypes.number.isRequired,
    }).isRequired,

    /**
     * Content to display in the `InfoWindow`.
     */
    children: PropTypes.node.isRequired,

    /**
     * Disable auto-pan on open.
     */
    disableAutoPan: PropTypes.bool,

    /**
     * Maximum width of the `InfoWindow`, regardless of content's width.
     */
    maxWidth: PropTypes.number,

    /**
     * The offset, in pixels, of the tip of the info window from the point
     * on the map at whose geographical coordinates the info window is anchored.
     */
    pixelOffset: PropTypes.shape({
      /**
       * The height along the y-axis, in pixels.
       */
      width: PropTypes.number.isRequired,
      /**
       * The width along the x-axis, in pixels.
       */
      height: PropTypes.number.isRequired,
    }),

    /**
     * All InfoWindows are displayed on the map in order of their zIndex,
     * with higher values displaying in front of InfoWindows with lower values.
     *
     * By default, InfoWindows are displayed according to their latitude,
     * with InfoWindows of lower latitudes appearing in front of InfoWindows
     * at higher latitudes.
     *
     * InfoWindows are always displayed in front of markers.
     */
    zIndex: PropTypes.number,
  };
}

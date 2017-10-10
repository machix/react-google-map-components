import React from "react";
import PropTypes from "prop-types";
import fpPick from "lodash/fp/pick";
import InfoWindowEvents from "./InfoWindowEvents";
import { isEqualProps, createListeners } from "../internal/Utils";
import { Portal } from "../internal/Portal";
import { MapContext } from "../internal/MapContext";

const pickProps = fpPick([
  "position",
  "maxWidth",
  "zIndex",
  "pixelOffset",
  "disableAutoPan",
]);

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
  componentWillMount() {
    const { mapContext } = this.context;

    const options = this.getOptions();
    const infoWindow = new mapContext.maps.InfoWindow();

    infoWindow.setValues(options);

    this.infoWindow = infoWindow;
    this.div = document.createElement("div");

    this.updateContent();
    this.updateVisibility();

    infoWindow.addListener(InfoWindowEvents.onCloseClick, () => {
      if (this.props.open) {
        infoWindow.open(mapContext.map);
      }
    });

    createListeners(
      InfoWindowEvents,
      x => this.props[x],
    ).forEach(([event, listener]) => {
      infoWindow.addListener(event, listener);
    });
  }

  componentWillUpdate(nextProps) {
    const { open, children, maxWidth } = this.props;

    const prevOptions = this.getOptions();
    const nextOptions = this.getOptions(nextProps);

    if (!isEqualProps(prevOptions, nextOptions)) {
      this.infoWindow.setValues(nextOptions);
    }

    if (nextProps.children !== children) {
      this.updateContent(nextProps);
    }

    if (
      Boolean(nextProps.open) !== Boolean(open) ||
      Boolean(nextProps.maxWidth !== maxWidth && nextProps.open)
    ) {
      this.updateVisibility(nextProps);
    }
  }

  componentWillUnmount() {
    this.infoWindow.close();
    this.context.mapContext.maps.event.clearInstanceListeners(this.infoWindow);
  }

  getOptions(props = this.props) {
    const options = pickProps(props);

    if (options.pixelOffset) {
      options.pixelOffset = this.context.mapContext.createSize(
        options.pixelOffset,
      );
    }

    return options;
  }

  updateContent({ children } = this.props) {
    this.infoWindow.setContent(
      React.isValidElement(children) ? this.div : children,
    );
  }

  updateVisibility({ open } = this.props) {
    if (open) {
      this.infoWindow.open(this.context.mapContext.map);
    } else {
      this.infoWindow.close();
    }
  }

  render() {
    const { open, children } = this.props;
    return !open || !React.isValidElement(children) ? null : (
      <Portal node={this.div}>{children}</Portal>
    );
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

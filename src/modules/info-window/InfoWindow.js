import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";
import { LatLngType, SizeType } from "../internal/Props";
import { createListeners } from "../internal/Utils";
import InfoWindowEvents from "./InfoWindowEvents";
import { InfoWindowManager } from "./InfoWindowManager";

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

InfoWindow.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  InfoWindow.propTypes = {
    /**
     * The LatLng at which to display this InfoWindow.
     * If the InfoWindow is opened with an anchor, the anchor's position will be used instead.
     */
    position: LatLngType.isRequired,

    /**
     * Content to display in the InfoWindow.
     */
    children: PropTypes.node.isRequired,

    /**
     * Disable auto-pan on open.
     * By default, the info window will pan the map so that it is fully visible when it opens.
     */
    disableAutoPan: PropTypes.bool,

    /**
     * Maximum width of the InfoWindow, regardless of content's width.
     * This value is only considered if it is set before a call to open.
     */
    maxWidth: PropTypes.number,

    /**
     * The offset, in pixels, of the tip of the info window from the point on the map at whose geographical
     * coordinates the info window is anchored.
     * If an InfoWindow is opened with an anchor, the pixelOffset will be calculated
     * from the anchor's anchorPoint property.
     */
    pixelOffset: SizeType,

    /**
     * All InfoWindows are displayed on the map in order of their zIndex,
     * with higher values displaying in front of InfoWindows with lower values.
     * By default, InfoWindows are displayed according to their latitude,
     * with InfoWindows of lower latitudes appearing in front of InfoWindows at higher latitudes.
     * InfoWindows are always displayed in front of markers.
     */
    zIndex: PropTypes.number,

    /**
     * This handler is called when the close button was clicked.
     */
    onCloseClick: PropTypes.func,
  };
}

import PropTypes from "prop-types";
import React from "react";
import DataLayerEvents from "../data-layer/DataLayerEvents";
import { MapManager } from "../internal/MapManager";
import { DataLinearRingType, LatLngType } from "../internal/Props";
import { createListeners } from "../internal/Utils";
import { DataPolygonManager } from "./DataPolygonManager";

export class DataPolygon extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new DataPolygonManager(context.mapManager);
  }

  componentDidMount() {
    const listeners = createListeners(DataLayerEvents, x => this.props[x]);

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

DataPolygon.contextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  DataPolygon.propTypes = {
    /**
     * LinearRings or arrays of positions.
     */
    geometry: PropTypes.oneOfType([
      PropTypes.arrayOf(LatLngType),
      PropTypes.arrayOf(DataLinearRingType),
    ]).isRequired,

    //
    // Events
    //

    /**
     * This handler is called for a click on the geometry.
     */
    onClick: PropTypes.func,

    /**
     * This handler is called for a double click on the geometry.
     */
    onDoubleClick: PropTypes.func,

    /**
     * This handler is called for a right click on the geometry.
     */
    onRightClick: PropTypes.func,

    /**
     * This handler is called when the mouse leaves the area of the geometry.
     */
    onMouseOut: PropTypes.func,

    /**
     * This handler is called when the mouse enters the area of the geometry.
     */
    onMouseOver: PropTypes.func,

    /**
     * This handler is called for a mouse down on the geometry.
     */
    onMouseDown: PropTypes.func,

    /**
     * This handler is called for a mouse up on the geometry.
     */
    onMouseUp: PropTypes.func,

    //
    // Style
    //

    /**
     * If true, the marker receives mouse and touch events.
     * Default value is true.
     */
    clickable: PropTypes.bool,

    /**
     * The fill color. All CSS3 colors are supported except for extended named colors.
     */
    fillColor: PropTypes.string,

    /**
     * he fill opacity between 0.0 and 1.0.
     */
    fillOpacity: PropTypes.number,

    /**
     * The stroke color. All CSS3 colors are supported except for extended named colors.
     */
    strokeColor: PropTypes.string,

    /**
     * The stroke opacity between 0.0 and 1.0.
     */
    strokeOpacity: PropTypes.number,

    /**
     * The stroke width in pixels.
     */
    strokeWeight: PropTypes.number,

    /**
     * All features are displayed on the map in order of their zIndex, with higher values displaying in front of features with lower values.
     */
    zIndex: PropTypes.number,
  };
}

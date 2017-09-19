import PropTypes from "prop-types";
import React from "react";
import DataLayerEvents from "../data-layer/DataLayerEvents";
import { MapContext } from "../internal/MapContext";
import { createListeners } from "../internal/Utils";
import { DataPolygonManager } from "./DataPolygonManager";

/**
 * Draws `google.maps.Data.Polygon`.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, DataPolygon } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <DataPolygon geometry={props.polygon} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Data.Polygon](https://developers.google.com/maps/documentation/javascript/reference#Data.Polygon)
 */
export class DataPolygon extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new DataPolygonManager(context.mapContext);
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
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

DataPolygon.defaultProps = {
  clickable: true,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  DataPolygon.propTypes = {
    /**
     * Array of array of positions.
     */
    geometry: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          /**
           * The latitude in degrees.
           */
          lat: PropTypes.number.isRequired,
          /**
           * The longitude in degrees.
           */
          lng: PropTypes.number.isRequired,
        }),
      ),
    ).isRequired,

    //
    // Style
    //

    /**
     * If true, the marker receives mouse and touch events.
     */
    clickable: PropTypes.bool,

    /**
     * The fill color.
     *
     * All CSS3 colors are supported except for extended named colors.
     */
    fillColor: PropTypes.string,

    /**
     * he fill opacity between 0.0 and 1.0.
     */
    fillOpacity: PropTypes.number,

    /**
     * The stroke color.
     *
     * All CSS3 colors are supported except for extended named colors.
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
     * All features are displayed on the map in order of their zIndex,
     * with higher values displaying in front of features with lower values.
     */
    zIndex: PropTypes.number,

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
  };
}

import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import fpPick from "lodash/fp/pick";
import { createListeners } from "../internal/Utils";
import { MapContext } from "../internal/MapContext";
import DataLayerEvents from "../data-layer/DataLayerEvents";

const pickStyles = fpPick([
  "clickable",
  "fillColor",
  "fillOpacity",
  "strokeColor",
  "strokeOpacity",
  "strokeWeight",
  "zIndex",
]);

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
  componentWillMount() {
    const { mapContext } = this.context;

    this.listeners = [];
    this.feature = new mapContext.maps.Data.Feature();

    this.updateStyles();
    this.updateGeometry();

    mapContext.map.data.add(this.feature);

    createListeners(
      DataLayerEvents,
      x => this.props[x],
    ).forEach(([event, listener]) => {
      this.addListener(event, listener);
    });
  }

  componentWillUpdate(nextProps) {
    this.updateStyles(nextProps);

    if (!isEqual(nextProps.geometry, this.props.geometry)) {
      this.updateGeometry(nextProps);
    }
  }

  componentWillUnmount() {
    this.context.mapContext.map.data.remove(this.feature);

    while (this.listeners.length > 0) {
      this.listeners.shift().remove();
    }
  }

  addListener(event, listener) {
    this.listeners.push(
      this.context.mapContext.map.data.addListener(event, x => {
        if (x.feature === this.feature) {
          listener(x);
        }
      }),
    );
  }

  updateStyles(props = this.props) {
    const styles = pickStyles(props);

    this.context.mapContext.map.data.overrideStyle(this.feature, styles);
  }

  updateGeometry(props = this.props) {
    this.feature.setGeometry(
      new this.context.mapContext.maps.Data.Polygon(props.geometry),
    );
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

import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { AnimationManager } from "./AnimationManager";

/**
 * Changes the center of the map by the given distance in pixels.
 *
 * If the distance is less than both the width and height of the map, the transition will be smoothly animated.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, PanBy } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <PanBy x={props.panX} y={props.panY} />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Map](https://developers.google.com/maps/documentation/javascript/reference#Map)
 */
export class PanBy extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new AnimationManager(context.mapContext);
  }

  componentDidMount() {
    const { x, y } = this.props;

    this.manager.panBy(x, y);
  }

  shouldComponentUpdate(nextProps) {
    const { x, y } = this.props;

    return nextProps.x !== x || nextProps.y !== y;
  }

  componentDidUpdate() {
    const { x, y } = this.props;

    this.manager.panBy(x, y);
  }

  render() {
    return null;
  }
}

PanBy.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  PanBy.propTypes = {
    /**
     * Defines the distance to coordinate from west to east in pixels.
     */
    x: PropTypes.number.isRequired,
    /**
     * Defines the distance to coordinate from north to south in pixels.
     */
    y: PropTypes.number.isRequired,
  };
}

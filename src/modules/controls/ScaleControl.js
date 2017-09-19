import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { ControlManager } from "./ControlManager";

/**
 * Controls display options of Scale control.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap, ScaleControl } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return (
 *     <GoogleMap {...props} maps={google.maps}>
 *       <ScaleControl />
 *     </GoogleMap>
 *   );
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.ScaleControlOptions](https://developers.google.com/maps/documentation/javascript/reference#ScaleControlOptions)
 */
export class ScaleControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new ControlManager("scaleControl", context.mapContext);
  }

  componentDidMount() {
    this.manager.attach(this.props);
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

ScaleControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

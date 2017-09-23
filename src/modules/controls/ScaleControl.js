import React from "react";

import { Control } from "./Control";

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
export function ScaleControl() {
  return <Control name="scaleControl" />;
}

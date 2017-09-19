import React from "react";
import PropTypes from "prop-types";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";
import { DrawingControl } from "../../../../../modules/drawing-control/DrawingControl";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

DrawingControlEvents.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

DrawingControlEvents.propTypes = {
  onCircleComplete: PropTypes.func,
  onMarkerComplete: PropTypes.func,
  onOverlayComplete: PropTypes.func,
  onPolygonComplete: PropTypes.func,
  onPolylineComplete: PropTypes.func,
  onRectangleComplete: PropTypes.func,
};

function DrawingControlEvents(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <DrawingControl {...props} />
    </GoogleMap>
  );
}

export default enhancer(DrawingControlEvents);

import React from "react";
import PropTypes from "prop-types";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";
import { Polyline } from "../../../../../modules/polyline/Polyline";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

PolylineHandlers.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

PolylineHandlers.propTypes = {
  onDrag: PropTypes.func,
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onDragEnd: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseDown: PropTypes.func,
  onDragStart: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseMove: PropTypes.func,
  onRightClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};

function PolylineHandlers(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <Polyline
        {...props}
        draggable
        clickable
        path={[
          { lat: 37.33821, lng: -121.88633 },
          { lat: 37.00578, lng: -121.56826 },
        ]}
      />
    </GoogleMap>
  );
}

export default enhancer(PolylineHandlers);

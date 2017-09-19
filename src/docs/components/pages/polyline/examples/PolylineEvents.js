import React from "react";
import PropTypes from "prop-types";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";
import { Polyline } from "../../../../../modules/polyline/Polyline";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

PolylineEvents.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

PolylineEvents.propTypes = {
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

function PolylineEvents(props, context) {
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

export default enhancer(PolylineEvents);

import React from "react";
import PropTypes from "prop-types";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";
import { Marker } from "../../../../../modules/marker/Marker";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

MarkerEvents.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

MarkerEvents.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onRightClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onDrag: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onPositionChanged: PropTypes.func,
};

function MarkerEvents(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <Marker draggable position={context.center} {...props} />
    </GoogleMap>
  );
}

export default enhancer(MarkerEvents);

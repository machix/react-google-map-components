import React from "react";
import PropTypes from "prop-types";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

GoogleMapHandlers.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

GoogleMapHandlers.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onRightClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onIdle: PropTypes.func,
  onTilesLoaded: PropTypes.func,
  onTiltChanged: PropTypes.func,
  onZoomChanged: PropTypes.func,
  onBoundsChanged: PropTypes.func,
  onCenterChanged: PropTypes.func,
  onHeadingChanged: PropTypes.func,
  onMapTypeIdChanged: PropTypes.func,
  onProjectionChanged: PropTypes.func,
};

function GoogleMapHandlers(props, context) {
  return (
    <GoogleMap
      {...props}
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    />
  );
}

export default enhancer(GoogleMapHandlers);

import React from "react";
import PropTypes from "prop-types";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";
import { InfoWindow } from "../../../../../modules/info-window/InfoWindow";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

InfoWindowEvents.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

InfoWindowEvents.propTypes = {
  onCloseClick: PropTypes.func,
};

function InfoWindowEvents(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <InfoWindow {...props} position={context.center}>
        Info Window Content
      </InfoWindow>
    </GoogleMap>
  );
}

export default enhancer(InfoWindowEvents);

import React from "react";
import PropTypes from "prop-types";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";
import { InfoWindow } from "../../../../../modules/info-window/InfoWindow";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

InfoWindowHandlers.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

InfoWindowHandlers.propTypes = {
  onCloseClick: PropTypes.func,
};

function InfoWindowHandlers(props, context) {
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

export default enhancer(InfoWindowHandlers);

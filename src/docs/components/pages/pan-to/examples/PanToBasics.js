import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { PanTo } from "../../../../../modules/animations/PanTo";
import { Marker } from "../../../../../modules/marker/Marker";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

PanToBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

PanToBasics.propTypes = {
  lat: FormProps.number("Latitude"),
  lng: FormProps.number("Longitude"),
};

PanToBasics.defaultProps = {
  lat: 36.964,
  lng: -122.015,
};

function PanToBasics(props, context) {
  const position = { lat: props.lat, lng: props.lng };

  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <PanTo latLng={position} />
      <Marker position={position} />
    </GoogleMap>
  );
}

export default enhancer(PanToBasics);

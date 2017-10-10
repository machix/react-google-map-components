import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { Marker } from "../../../../../modules/marker/Marker";
import { FitBounds } from "../../../../../modules/animations/FitBounds";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

FitBoundsBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

FitBoundsBasics.propTypes = {
  lat1: FormProps.number("Latitude 1"),
  lng1: FormProps.number("Longitude 1"),
  lat2: FormProps.number("Latitude 2"),
  lng2: FormProps.number("Longitude 2"),
  lat3: FormProps.number("Latitude 3"),
  lng3: FormProps.number("Longitude 3"),
};

FitBoundsBasics.defaultProps = {
  lat1: 36,
  lng1: -122,
  lat2: 34,
  lng2: -120,
  lat3: 34,
  lng3: -124,
};

function FitBoundsBasics(props, context) {
  const position1 = { lat: props.lat1, lng: props.lng1 };
  const position2 = { lat: props.lat2, lng: props.lng2 };
  const position3 = { lat: props.lat3, lng: props.lng3 };

  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <Marker position={position1} />
      <Marker position={position2} />
      <Marker position={position3} />

      <FitBounds latLngBounds={[position1, position2, position3]} />
    </GoogleMap>
  );
}

export default enhancer(FitBoundsBasics);

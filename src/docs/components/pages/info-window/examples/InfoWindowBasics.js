import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { InfoWindow } from "../../../../../modules/info-window/InfoWindow";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

InfoWindowBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

InfoWindowBasics.propTypes = {
  change: PropTypes.func,

  open: FormProps.bool("Open"),

  lat: FormProps.number("Latitude"),
  lng: FormProps.number("Longitude"),
  maxWidth: FormProps.number("Max Width"),

  content: FormProps.string("Content", 3),
};

InfoWindowBasics.defaultProps = {
  open: true,

  lat: 36.964,
  lng: -122.015,

  maxWidth: 120,

  content: "Info Window Content",
};

function InfoWindowBasics(props, context) {
  const position = { lat: props.lat, lng: props.lng };

  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={position}
      style={context.styles.map}
    >
      <InfoWindow
        open={props.open}
        position={position}
        maxWidth={props.maxWidth}
        onCloseClick={() => props.change("open", false)}
      >
        {props.content}
      </InfoWindow>
    </GoogleMap>
  );
}

export default enhancer(InfoWindowBasics);

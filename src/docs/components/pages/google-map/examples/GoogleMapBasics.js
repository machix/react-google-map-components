import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

GoogleMapBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

GoogleMapBasics.propTypes = {
  lat: FormProps.number("Latitude"),
  lng: FormProps.number("Longitude"),
  zoom: FormProps.number("Zoom"),
  clickableIcons: FormProps.bool("Clickable Icons"),
  disableDoubleClickZoom: FormProps.bool("Disable Double Click Zoom"),
  mapTypeId: FormProps.oneOf("Map Type", [
    "HYBRID",
    "ROADMAP",
    "SATELLITE",
    "TERRAIN",
  ]),
};

GoogleMapBasics.defaultProps = {
  lat: 36.964,
  lng: -122.015,
  zoom: 9,
  mapTypeId: "ROADMAP",
  clickableIcons: true,
  disableDoubleClickZoom: false,
};

function GoogleMapBasics(props, context) {
  return (
    <GoogleMap
      maps={context.maps}
      style={context.styles.map}
      zoom={props.zoom}
      mapTypeId={props.mapTypeId}
      clickableIcons={props.clickableIcons}
      center={{ lat: props.lat, lng: props.lng }}
      disableDoubleClickZoom={props.disableDoubleClickZoom}
    />
  );
}

export default enhancer(GoogleMapBasics);

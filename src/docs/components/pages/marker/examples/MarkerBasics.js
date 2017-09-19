import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { Marker } from "../../../../../modules/marker/Marker";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

MarkerBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

MarkerBasics.propTypes = {
  change: PropTypes.func,

  lat: FormProps.number("Latitude"),
  lng: FormProps.number("Longitude"),
  animation: FormProps.oneOf("Animation", ["BOUNCE", "DROP"]),
  label: FormProps.string("Label"),
  title: FormProps.string("Title"),

  visible: FormProps.bool("Visible"),
  draggable: FormProps.bool("Draggable"),
  crossOnDrag: FormProps.bool("Cross On Drag"),
};

MarkerBasics.defaultProps = {
  lat: 36.964,
  lng: -122.015,
  animation: "",
  label: "",
  title: "Marker Title",
  visible: true,
  draggable: false,
  crossOnDrag: true,
};

function MarkerBasics(props, context) {
  const position = { lat: props.lat, lng: props.lng };

  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={position}
      style={context.styles.map}
    >
      <Marker
        position={position}
        label={props.label}
        visible={props.visible}
        title={props.title}
        draggable={props.draggable}
        crossOnDrag={props.crossOnDrag}
        animation={props.animation}
        onDragEnd={x => {
          props.change("lat", x.latLng.lat());
          props.change("lng", x.latLng.lng());
        }}
      />
    </GoogleMap>
  );
}

export default enhancer(MarkerBasics);

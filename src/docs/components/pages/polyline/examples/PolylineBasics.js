import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { Polyline } from "../../../../../modules/polyline/Polyline";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

PolylineBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

PolylineBasics.propTypes = {
  change: PropTypes.func,
  visible: FormProps.bool("Visible"),
  clickable: FormProps.bool("Clickable"),
  draggable: FormProps.bool("Draggable"),
  strokeColor: FormProps.string("Stroke Color"),
  strokeWidth: FormProps.number("Stroke Width"),
  strokeOpacity: FormProps.number("Stroke Opacity"),
  lat1: FormProps.number("Latitude 1"),
  lng1: FormProps.number("Longitude 1"),
  lat2: FormProps.number("Latitude 2"),
  lng2: FormProps.number("Longitude 2"),
};

PolylineBasics.defaultProps = {
  visible: true,
  clickable: true,
  draggable: false,
  strokeColor: "#FF0000",
  strokeWidth: 1,
  strokeOpacity: 1,
  lat1: 37.33821,
  lng1: -121.88633,
  lat2: 37.00578,
  lng2: -121.56826,
};

function PolylineBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <Polyline
        {...props}
        path={[
          { lat: props.lat1, lng: props.lng1 },
          { lat: props.lat2, lng: props.lng2 },
        ]}
        onDragEnd={x => {
          const start = x.path.getAt(0);

          props.change("lat1", start.lat());
          props.change("lng1", start.lng());

          const end = x.path.getAt(1);

          props.change("lat2", end.lat());
          props.change("lng2", end.lng());
        }}
      />
    </GoogleMap>
  );
}

export default enhancer(PolylineBasics);

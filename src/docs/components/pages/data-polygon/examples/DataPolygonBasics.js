import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { DataPolygon } from "../../../../../modules/data-polygon/DataPolygon";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

DataPolygonBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

DataPolygonBasics.propTypes = {
  visible: FormProps.bool("Visible"),
  clickable: FormProps.bool("Clickable"),

  centerLat: FormProps.number("Center Latitude"),
  centerLng: FormProps.number("Center Longitude"),

  lat: FormProps.number("Outer Polygon Latitude"),
  lng: FormProps.number("Outer Polygon Longitude"),

  fillColor: FormProps.string("Fill Color"),
  fillOpacity: FormProps.number("Fill Opacity"),
  strokeColor: FormProps.string("Stroke Color"),
  strokeOpacity: FormProps.number("Stroke Opacity"),
  strokeWeight: FormProps.number("Stroke Weight"),
};

DataPolygonBasics.defaultProps = {
  visible: true,
  clickable: true,

  lat: -32,
  lng: 153,

  centerLat: -33,
  centerLng: 151,

  fillColor: "#000000",
  fillOpacity: 0.4,
  strokeColor: "#000000",
  strokeOpacity: 1,
  strokeWeight: 3,
};

function DataPolygonBasics(props, context) {
  return (
    <GoogleMap
      zoom={5}
      maps={context.maps}
      style={context.styles.map}
      center={{ lat: props.centerLat, lng: props.centerLng }}
    >
      {props.visible && (
        <DataPolygon
          {...props}
          geometry={[
            [
              { lat: props.lat, lng: props.lng },
              { lat: props.lat - 3, lng: props.lng },
              { lat: props.lat - 3, lng: props.lng + 5 },
              { lat: props.lat, lng: props.lng + 5 },
            ],
            [
              { lat: -33, lng: 154 },
              { lat: -34, lng: 154 },
              { lat: -34, lng: 155 },
              { lat: -33, lng: 155 },
            ],
            [
              { lat: -33, lng: 156 },
              { lat: -34, lng: 156 },
              { lat: -34, lng: 157 },
              { lat: -33, lng: 157 },
            ],
          ]}
        />
      )}
    </GoogleMap>
  );
}

export default enhancer(DataPolygonBasics);

import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { DrawingControl } from "../../../../../modules/drawing-control/DrawingControl";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

DrawingControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

DrawingControlBasics.propTypes = {
  visible: FormProps.bool("Visible"),

  position: FormProps.oneOf("Position", [
    "BOTTOM_CENTER",
    "BOTTOM_LEFT",
    "BOTTOM_RIGHT",
    "LEFT_BOTTOM",
    "LEFT_CENTER",
    "LEFT_TOP",
    "RIGHT_BOTTOM",
    "RIGHT_CENTER",
    "RIGHT_TOP",
    "TOP_CENTER",
    "TOP_LEFT",
    "TOP_RIGHT",
  ]),
  marker: FormProps.bool("Marker"),
  polyline: FormProps.bool("Polyline"),
  rectangle: FormProps.bool("Rectangle"),
  circle: FormProps.bool("Circle"),
  polygon: FormProps.bool("Polygon"),
};

DrawingControlBasics.defaultProps = {
  visible: true,
  marker: true,
  polyline: true,
  rectangle: true,
  circle: true,
  polygon: true,
  position: "TOP_LEFT",
};

function DrawingControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && (
        <DrawingControl
          position={props.position}
          drawingModes={[
            props.marker && "marker",
            props.polyline && "polyline",
            props.rectangle && "rectangle",
            props.circle && "circle",
            props.polygon && "polygon",
          ].filter(Boolean)}
        />
      )}
    </GoogleMap>
  );
}

export default enhancer(DrawingControlBasics);

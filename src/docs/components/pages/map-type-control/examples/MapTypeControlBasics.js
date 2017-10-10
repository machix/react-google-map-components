import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { MapTypeControl } from "../../../../../modules/controls/MapTypeControl";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

MapTypeControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

MapTypeControlBasics.propTypes = {
  visible: FormProps.bool("Visible"),

  hybrid: FormProps.bool("Hybrid"),
  roadmap: FormProps.bool("Roadmap"),
  satellite: FormProps.bool("Satellite"),
  terrain: FormProps.bool("Terrain"),

  controlStyle: FormProps.oneOf("Style", [
    "DEFAULT",
    "DROPDOWN_MENU",
    "HORIZONTAL_BAR",
  ]),

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
};

MapTypeControlBasics.defaultProps = {
  visible: true,

  hybrid: true,
  roadmap: true,
  satellite: true,
  terrain: true,

  position: "RIGHT_TOP",
  controlStyle: "DEFAULT",
};

function MapTypeControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && (
        <MapTypeControl
          position={props.position}
          controlStyle={props.controlStyle}
          mapTypeIds={[
            props.hybrid && "HYBRID",
            props.roadmap && "ROADMAP",
            props.satellite && "SATELLITE",
            props.terrain && "TERRAIN",
          ].filter(Boolean)}
        />
      )}
    </GoogleMap>
  );
}

export default enhancer(MapTypeControlBasics);

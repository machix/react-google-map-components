import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { RotateControl } from "../../../../../modules/controls/RotateControl";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

RotateControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

RotateControlBasics.propTypes = {
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
};

RotateControlBasics.defaultProps = {
  visible: true,
  position: "TOP_LEFT",
};

function RotateControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={18}
      maps={context.maps}
      mapTypeId="SATELLITE"
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && <RotateControl position={props.position} />}
    </GoogleMap>
  );
}

export default enhancer(RotateControlBasics);

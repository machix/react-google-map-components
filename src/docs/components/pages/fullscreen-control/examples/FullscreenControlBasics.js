import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { FullscreenControl } from "../../../../../modules/controls/FullscreenControl";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

FullscreenControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

FullscreenControlBasics.propTypes = {
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

FullscreenControlBasics.defaultProps = {
  visible: true,
  position: "RIGHT_TOP",
};

function FullscreenControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && <FullscreenControl position={props.position} />}
    </GoogleMap>
  );
}

export default enhancer(FullscreenControlBasics);

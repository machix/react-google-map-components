import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { ZoomControl } from "../../../../../modules/controls/ZoomControl";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

ZoomControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

ZoomControlBasics.propTypes = {
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

ZoomControlBasics.defaultProps = {
  visible: true,
  position: "TOP_LEFT",
};

function ZoomControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && <ZoomControl position={props.position} />}
    </GoogleMap>
  );
}

export default enhancer(ZoomControlBasics);

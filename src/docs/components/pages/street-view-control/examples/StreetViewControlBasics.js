import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { StreetViewControl } from "../../../../../modules/controls/StreetViewControl";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

StreetViewControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

StreetViewControlBasics.propTypes = {
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

StreetViewControlBasics.defaultProps = {
  visible: true,
  position: "RIGHT_TOP",
};

function StreetViewControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={18}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && <StreetViewControl position={props.position} />}
    </GoogleMap>
  );
}

export default enhancer(StreetViewControlBasics);

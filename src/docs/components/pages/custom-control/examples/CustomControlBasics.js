import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { CustomControl } from "../../../../../modules/custom-control/CustomControl";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

CustomControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

CustomControlBasics.propTypes = {
  visible: FormProps.bool("Visible"),
  label: FormProps.string("Label"),
  message: FormProps.string("Message"),
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

CustomControlBasics.defaultProps = {
  visible: true,
  label: "Click It!",
  message: "Boom!",
  position: "BOTTOM_CENTER",
};

function CustomControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && (
        <CustomControl position={props.position}>
          <button
            type="button"
            className="btn btn-primary m-1"
            // eslint-disable-next-line no-alert
            onClick={() => alert(props.message)}
          >
            {props.label}
          </button>
        </CustomControl>
      )}
    </GoogleMap>
  );
}

export default enhancer(CustomControlBasics);

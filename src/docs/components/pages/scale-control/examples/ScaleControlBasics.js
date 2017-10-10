import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { ScaleControl } from "../../../../../modules/controls/ScaleControl";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

ScaleControlBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

ScaleControlBasics.propTypes = {
  visible: FormProps.bool("Visible"),
};

ScaleControlBasics.defaultProps = {
  visible: true,
};

function ScaleControlBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      {props.visible && <ScaleControl />}
    </GoogleMap>
  );
}

export default enhancer(ScaleControlBasics);

import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { PanBy } from "../../../../../modules/animations/PanBy";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

PanByBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
};

PanByBasics.propTypes = {
  x: FormProps.number("X"),
  y: FormProps.number("Y"),
};

PanByBasics.defaultProps = {
  x: 0,
  y: 0,
};

function PanByBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <PanBy x={props.x} y={props.y} />
    </GoogleMap>
  );
}

export default enhancer(PanByBasics);

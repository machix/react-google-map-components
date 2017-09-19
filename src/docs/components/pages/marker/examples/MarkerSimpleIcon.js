import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { Marker } from "../../../../../modules/marker/Marker";

export const pageName = "Simple Icon Example";

const enhancer = wrapWithForm();

MarkerBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

MarkerBasics.propTypes = {
  label: FormProps.string("Label"),
  color: FormProps.string("Color"),
  backgroundColor: FormProps.string("Background Color"),
};

MarkerBasics.defaultProps = {
  label: "A",
  color: "FFFF00",
  backgroundColor: "FF0000",
};

const getIcon = (label, color, backgroundColor) =>
  `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${label}|${backgroundColor}|${color}`;

function MarkerBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <Marker
        position={context.center}
        icon={getIcon(props.label, props.color, props.backgroundColor)}
      />
    </GoogleMap>
  );
}

export default enhancer(MarkerBasics);

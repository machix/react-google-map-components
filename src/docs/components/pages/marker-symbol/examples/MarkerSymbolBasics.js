import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { Marker } from "../../../../../modules/marker/Marker";
import { MarkerSymbol } from "../../../../../modules/marker/MarkerSymbol";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import Car from "./assets/car.json";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

MarkerSymbolBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

MarkerSymbolBasics.propTypes = {
  scale: FormProps.number("Scale"),
  rotation: FormProps.number("Rotation"),

  strokeColor: FormProps.string("Stroke Color"),
  strokeWeight: FormProps.number("Stroke Weight"),
  strokeOpacity: FormProps.number("Stroke Opacity"),

  fillColor: FormProps.string("Fill Color"),
  fillOpacity: FormProps.number("Fill Opacity"),

  anchorX: FormProps.number("Anchor X"),
  anchorY: FormProps.number("Anchor Y"),

  labelOriginX: FormProps.number("Label Origin X"),
  labelOriginY: FormProps.number("Label Origin Y"),
};

MarkerSymbolBasics.defaultProps = {
  scale: 0.7,
  rotation: 0,
  strokeColor: "white",
  strokeWeight: 0.1,
  strokeOpacity: 1,

  fillOpacity: 1,
  fillColor: "#404040",

  anchorX: 10,
  anchorY: 25,

  labelOriginX: 32,
  labelOriginY: 32,
};

function MarkerSymbolBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <Marker
        position={context.center}
        icon={
          <MarkerSymbol
            path={Car.path}
            scale={props.scale}
            rotation={props.rotation}
            fillColor={props.fillColor}
            fillOpacity={props.fillOpacity}
            strokeColor={props.strokeColor}
            strokeWeight={props.strokeWeight}
            strokeOpacity={props.strokeOpacity}
            anchor={{ x: props.anchorX, y: props.anchorY }}
            labelOrigin={{ x: props.labelOriginX, y: props.labelOriginY }}
          />
        }
      />
    </GoogleMap>
  );
}

export default enhancer(MarkerSymbolBasics);

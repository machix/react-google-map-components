import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { Marker } from "../../../../../modules/marker/Marker";
import { MarkerIcon } from "../../../../../modules/marker/MarkerIcon";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import Icon from "./assets/icon.svg";

export const pageName = "Basic Example";

const enhancer = wrapWithForm();

MarkerIconBasics.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

MarkerIconBasics.propTypes = {
  label: FormProps.string("Label"),

  anchorX: FormProps.number("Anchor X"),
  anchorY: FormProps.number("Anchor Y"),

  labelOriginX: FormProps.number("Label Origin X"),
  labelOriginY: FormProps.number("Label Origin Y"),

  originX: FormProps.number("Origin X"),
  originY: FormProps.number("Origin Y"),

  sizeWidth: FormProps.number("Size Width"),
  sizeHeight: FormProps.number("Size Height"),

  scaledSizeWidth: FormProps.number("Scaled Size Width"),
  scaledSizeHeight: FormProps.number("Scaled Size Height"),

  asComponent: FormProps.bool("As Component"),
};

MarkerIconBasics.defaultProps = {
  label: "Label",

  anchorX: 32,
  anchorY: 64,

  labelOriginX: 32,
  labelOriginY: 32,

  originX: 0,
  originY: 0,

  sizeWidth: 64,
  sizeHeight: 64,

  scaledSizeWidth: 64,
  scaledSizeHeight: 64,

  asComponent: true,
};

function MarkerIconBasics(props, context) {
  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={context.center}
      style={context.styles.map}
    >
      <Marker
        label={props.label}
        position={context.center}
        icon={
          !props.asComponent ? (
            Icon
          ) : (
            <MarkerIcon
              url={Icon}
              anchor={{ x: props.anchorX, y: props.anchorY }}
              origin={{ x: props.originX, y: props.originY }}
              labelOrigin={{ x: props.labelOriginX, y: props.labelOriginY }}
              size={{ width: props.sizeWidth, height: props.sizeHeight }}
              scaledSize={{
                width: props.scaledSizeWidth,
                height: props.scaledSizeHeight,
              }}
            />
          )
        }
      />
    </GoogleMap>
  );
}

export default enhancer(MarkerIconBasics);

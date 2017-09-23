import React from "react";
import PropTypes from "prop-types";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { InfoWindow } from "../../../../../modules/info-window/InfoWindow";

export const pageName = "Complex Example";

const enhancer = wrapWithForm();

InfoWindowComplex.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

InfoWindowComplex.propTypes = {
  change: PropTypes.func,

  open: FormProps.bool("Open"),

  lat: FormProps.number("Latitude"),
  lng: FormProps.number("Longitude"),

  maxWidth: FormProps.number("Max Width"),

  heading: FormProps.string("Heading"),
  content: FormProps.string("Content", 5),

  inline: FormProps.bool("Inline HTML (Check React DevTools)"),
};

InfoWindowComplex.defaultProps = {
  open: true,

  lat: 36.964,
  lng: -122.015,

  maxWidth: 300,

  heading: "Uluru",
  content:
    "<b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).",

  inline: false,
};

function InfoWindowComplex(props, context) {
  const position = { lat: props.lat, lng: props.lng };

  return (
    <GoogleMap
      zoom={8}
      maps={context.maps}
      center={position}
      style={context.styles.map}
    >
      <InfoWindow
        open={props.open}
        position={position}
        maxWidth={props.maxWidth}
        onCloseClick={() => props.change("open", false)}
      >
        {props.inline ? (
          `<div><h1>${props.heading}</h1></div><p>${props.content}</p>`
        ) : (
          <div>
            <h1>{props.heading}</h1>

            <p
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: props.content }}
            />
          </div>
        )}
      </InfoWindow>
    </GoogleMap>
  );
}

export default enhancer(InfoWindowComplex);

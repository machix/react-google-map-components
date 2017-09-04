import PropTypes from "prop-types";
import { PointType, SizeType } from "../internal/Props";

export function MarkerIcon() {
  throw new Error(
    "MarkerIcon should not be rendered, it used as configuration element for `Marker`",
  );
}

if (__DEV__) {
  MarkerIcon.propTypes = {
    /**
     * The URL of the image or sprite sheet.
     */
    url: PropTypes.string.isRequired,

    /**
     * The position at which to anchor an image in correspondence to the location of the marker on the map.
     * By default, the anchor is located along the center point of the bottom of the image.
     */
    anchor: PointType,

    /**
     * The origin of the label relative to the top-left corner of the icon image, if a label is supplied by the marker.
     * By default, the origin is located in the center point of the image.
     */
    labelOrigin: PointType,
    /**
     * The position of the image within a sprite, if any.
     * By default, the origin is located at the top left corner of the image `(0, 0)`.
     */
    origin: PointType,

    /**
     * The display size of the sprite or image.
     * When using sprites, you must specify the sprite size.
     * If the size is not provided, it will be set when the image loads.
     */
    size: SizeType,
    /**
     * The size of the entire image after scaling, if any.
     * Use this property to stretch/shrink an image or a sprite.
     */
    scaledSize: SizeType,
  };
}

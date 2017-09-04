import PropTypes from "prop-types";

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLng
 */
export const LatLngType = PropTypes.shape({
  /**
   * The latitude in degrees.
   */
  lat: PropTypes.number.isRequired,
  /**
   * The longitude in degrees.
   */
  lng: PropTypes.number.isRequired,
});

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#Point
 */
export const PointType = PropTypes.shape({
  /**
   * The X coordinate.
   */
  x: PropTypes.number.isRequired,
  /**
   * The Y coordinate.
   */
  y: PropTypes.number.isRequired,
});

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#Size
 */
export const SizeType = PropTypes.shape({
  /**
   * The height along the y-axis, in pixels.
   */
  width: PropTypes.number.isRequired,
  /**
   * The width along the x-axis, in pixels.
   */
  height: PropTypes.number.isRequired,
});

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#Animation
 */
export const AnimationType = PropTypes.oneOf([
  /**
   * 	Marker bounces until animation is stopped.
   */
  "BOUNCE",
  /**
   * Marker falls from the top of the map ending with a small bounce.
   */
  "DROP",
]);

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerLabel
 */
export const MarkerLabelType = PropTypes.shape({
  /**
   * The color of the label text. Default color is black.
   */
  color: PropTypes.string,
  /**
   * The font family of the label text (equivalent to the CSS font-family property).
   */
  fontFamily: PropTypes.string,
  /**
   * The font size of the label text (equivalent to the CSS font-size property).
   * Default size is 14px.
   */
  fontSize: PropTypes.string,
  /**
   * The font weight of the label text (equivalent to the CSS font-weight property).
   */
  fontWeight: PropTypes.string,
  /**
   * The text to be displayed in the label.
   */
  text: PropTypes.string,
});

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerShape
 */
export const MarkerShapeType = PropTypes.shape({
  /**
   * The format of this attribute depends on the value of the type and follows the w3 AREA coords
   * specification found at http://www.w3.org/TR/REC-html40/struct/objects.html#adef-coords.
   *
   * The coords attribute is an array of integers that specify the pixel position of the shape
   * relative to the top-left corner of the target image.
   *
   * The coordinates depend on the value of type as follows:
   * - `circle`: coords is `[x1,y1,r]` where x1,y2 are the coordinates of the center of the circle, and r is the radius of the circle.
   * - `poly`: coords is `[x1,y1,x2,y2...xn,yn]` where each x,y pair contains the coordinates of one vertex of the polygon.
   * - `rect`: coords is `[x1,y1,x2,y2]` where x1,y1 are the coordinates of the upper-left corner of the rectangle and x2,y2 are the coordinates of the lower-right coordinates of the rectangle.
   */
  coords: PropTypes.arrayOf(PropTypes.number),
  /**
   * Describes the shape's type and can be `circle`, `poly` or `rect`.
   */
  type: PropTypes.oneOf(["circle", "poly", "rect"]),
});

/**
 * @url https://developers.google.com/maps/documentation/javascript/3.exp/reference#ControlPosition
 */
export const ControlPositionType = PropTypes.oneOf([
  /**
   * 	Elements are positioned in the center of the bottom row.
   */
  "BOTTOM_CENTER",
  /**
   * Elements are positioned in the bottom left and flow towards the middle. Elements are positioned to the right of the Google logo.
   */
  "BOTTOM_LEFT",
  /**
   * Elements are positioned in the bottom right and flow towards the middle. Elements are positioned to the left of the copyrights.
   */
  "BOTTOM_RIGHT",
  /**
   * Elements are positioned on the left, above bottom-left elements, and flow upwards.
   */
  "LEFT_BOTTOM",
  /**
   * Elements are positioned in the center of the left side.
   */
  "LEFT_CENTER",
  /**
   * Elements are positioned on the left, below top-left elements, and flow downwards.
   */
  "LEFT_TOP",
  /**
   * Elements are positioned on the right, above bottom-right elements, and flow upwards.
   */
  "RIGHT_BOTTOM",
  /**
   * Elements are positioned in the center of the right side.
   */
  "RIGHT_CENTER",
  /**
   * Elements are positioned on the right, below top-right elements, and flow downwards.
   */
  "RIGHT_TOP",
  /**
   * Elements are positioned in the center of the top row.
   */
  "TOP_CENTER",
  /**
   * Elements are positioned in the top left and flow towards the middle.
   */
  "TOP_LEFT",
  /**
   * Elements are positioned in the top right and flow towards the middle.
   */
  "TOP_RIGHT",
]);

/**
 * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapTypeId
 */
export const MapTypeIdType = PropTypes.oneOf([
  /**
   * This map type displays a transparent layer of major streets on satellite images.
   */
  "HYBRID",
  /**
   * This map type displays a normal street map.
   */
  "ROADMAP",
  /**
   * This map type displays satellite images.
   */
  "SATELLITE",
  /**
   * This map type displays maps with physical features such as terrain and vegetation.
   */
  "TERRAIN",
]);

/**
 * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapTypeId
 */
export const MapTypeControlStyleType = PropTypes.oneOf([
  /**
   * Uses the default map type control.
   * When the DEFAULT control is shown, it will vary according to window size and other factors.
   * The DEFAULT control may change in future versions of the API.
   */
  "DEFAULT",
  /**
   * A dropdown menu for the screen realestate conscious.
   */
  "DROPDOWN_MENU",
  /**
   * The standard horizontal radio buttons bar.
   */
  "HORIZONTAL_BAR",
]);

/**
 * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#Data.LinearRing
 */
export const DataLinearRingType = PropTypes.arrayOf(LatLngType);

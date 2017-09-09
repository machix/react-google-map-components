import * as events from "./DrawingControlEvents";

const handlers = [
  [events.ON_CIRCLE_COMPLETE, "onCircleComplete"],
  [events.ON_MARKER_COMPLETE, "onMarkerComplete"],
  [events.ON_OVERLAY_COMPLETE, "onOverlayComplete"],
  [events.ON_POLYGON_COMPLETE, "onPolygonComplete"],
  [events.ON_POLYLINE_COMPLETE, "onPolylineComplete"],
  [events.ON_RECTANGLE_COMPLETE, "onRectangleComplete"],
];

export const forEachDrawingControlEvent = fn => {
  handlers.forEach(x => fn(x[0], x[1]));
};

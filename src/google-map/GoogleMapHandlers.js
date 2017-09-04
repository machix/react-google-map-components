import * as events from "./GoogleMapEvents";
import { forEachEvent } from "../events/GenericHandlers";

const handlers = [
  [events.ON_MOUSE_MOVE, "onMouseMove"],
  [events.ON_IDLE, "onIdle"],
  [events.ON_TILES_LOADED, "onTilesLoaded"],
  [events.ON_TILT_CHANGED, "onTiltChanged"],
  [events.ON_ZOOM_CHANGED, "onZoomChanged"],
  [events.ON_BOUNDS_CHANGED, "onBoundsChanged"],
  [events.ON_CENTER_CHANGED, "onCenterChanged"],
  [events.ON_HEADING_CHANGED, "onHeadingChanged"],
  [events.ON_MAP_TYPE_ID_CHANGED, "onMapTypeIdChanged"],
  [events.ON_PROJECTION_CHANGED, "onProjectionChanged"],
];

export const forEachGoogleMapsEvent = fn => {
  forEachEvent(fn);
  handlers.forEach(x => fn(x[0], x[1]));
};

import GenericEvents from "../internal/GenericEvents";

export default {
  ON_CLICK: GenericEvents.ON_CLICK,
  ON_DOUBLE_CLICK: GenericEvents.ON_DOUBLE_CLICK,
  ON_RIGHT_CLICK: GenericEvents.ON_RIGHT_CLICK,
  ON_MOUSE_OUT: GenericEvents.ON_MOUSE_OUT,
  ON_MOUSE_OVER: GenericEvents.ON_MOUSE_OVER,
  ON_MOUSE_MOVE: GenericEvents.ON_MOUSE_MOVE,
  ON_DRAG: GenericEvents.ON_DRAG,
  ON_DRAG_START: GenericEvents.ON_DRAG_START,
  ON_DRAG_END: GenericEvents.ON_DRAG_END,

  ON_IDLE: "idle",
  ON_TILES_LOADED: "tilesloaded",
  ON_TILT_CHANGED: "tilt_changed",
  ON_ZOOM_CHANGED: "zoom_changed",
  ON_BOUNDS_CHANGED: "bounds_changed",
  ON_CENTER_CHANGED: "center_changed",
  ON_HEADING_CHANGED: "heading_changed",
  ON_MAP_TYPE_ID_CHANGED: "maptypeid_changed",
  ON_PROJECTION_CHANGED: "projection_changed",
};

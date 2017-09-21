import GenericEvents from "../internal/GenericEvents";

export default {
  onClick: GenericEvents.onClick,
  onDoubleClick: GenericEvents.onDoubleClick,
  onRightClick: GenericEvents.onRightClick,
  onMouseOut: GenericEvents.onMouseOut,
  onMouseOver: GenericEvents.onMouseOver,
  onMouseMove: GenericEvents.onMouseMove,
  onDrag: GenericEvents.onDrag,
  onDragStart: GenericEvents.onDragStart,
  onDragEnd: GenericEvents.onDragEnd,

  onIdle: "idle",
  onTilesLoaded: "tilesloaded",
  onTiltChanged: "tilt_changed",
  onZoomChanged: "zoom_changed",
  onBoundsChanged: "bounds_changed",
  onCenterChanged: "center_changed",
  onHeadingChanged: "heading_changed",
  onMapTypeIdChanged: "maptypeid_changed",
  onProjectionChanged: "projection_changed",
};

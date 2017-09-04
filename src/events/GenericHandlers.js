import * as events from "./GenericEvents";

const handlers = [
  [events.ON_CLICK, "onClick"],
  [events.ON_DOUBLE_CLICK, "onDoubleClick"],
  [events.ON_RIGHT_CLICK, "onRightClick"],
  [events.ON_MOUSE_OUT, "onMouseOut"],
  [events.ON_MOUSE_OVER, "onMouseOver"],
  [events.ON_DRAG, "onDrag"],
  [events.ON_DRAG_START, "onDragStart"],
  [events.ON_DRAG_END, "onDragEnd"],
];

export const forEachEvent = fn => handlers.forEach(x => fn(x[0], x[1]));

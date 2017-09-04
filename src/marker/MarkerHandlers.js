import * as events from "./MarkerEvents";
import { forEachEvent } from "../events/GenericHandlers";

const handlers = [
  [events.ON_MOUSE_DOWN, "onMouseDown"],
  [events.ON_MOUSE_UP, "onMouseUp"],

  [events.ON_POSITION_CHANGED, "onPositionChanged"],
];

export const forEachMarkerEvent = fn => {
  forEachEvent(fn);
  handlers.forEach(x => fn(x[0], x[1]));
};

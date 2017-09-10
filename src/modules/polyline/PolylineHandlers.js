import { forEachEvent } from "../events/GenericHandlers";
import * as events from "./PolylineEvents";

const handlers = [
  [events.ON_MOUSE_UP, "onMouseUp"],
  [events.ON_MOUSE_MOVE, "onMouseMove"],
  [events.ON_MOUSE_DOWN, "onMouseDown"],
];

export const forEachPolylineEvent = fn => {
  forEachEvent(fn);
  handlers.forEach(x => fn(x[0], x[1]));
};

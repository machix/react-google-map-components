import * as events from "./DataLayerEvents";
import { forEachEvent } from "../events/GenericHandlers";

const handlers = [
  [events.ON_MOUSE_DOWN, "onMouseDown"],
  [events.ON_MOUSE_UP, "onMouseUp"],
];

export const forEachDataLayerEvent = fn => {
  forEachEvent(fn);
  handlers.forEach(x => fn(x[0], x[1]));
};

import * as events from "./InfoWindowEvents";

const handlers = [[events.ON_CLOSE_CLICK, "onCloseClick"]];

export const forEachInfoWindowEvent = fn => {
  handlers.forEach(x => fn(x[0], x[1]));
};

import fpPick from "lodash/fp/pick";
import GenericEvents from "../internal/GenericEvents";

import { MapContext } from "../internal/MapContext";
import { getChangedProps } from "../internal/Utils";

const pickProps = fpPick([
  "path",
  "icons",
  "zIndex",
  "visible",
  "geodesic",
  "clickable",
  "draggable",
  "strokeColor",
  "strokeWeight",
  "strokeOpacity",
]);

export class PolylineManager {
  constructor(context: MapContext) {
    const { Polyline } = context.maps;

    this.context = context;

    this.path = null;
    this.polyline = new Polyline();
  }

  attach(props, listeners) {
    const polyline = this.polyline;
    const options = pickProps(props);

    this.polyline.setValues(options);
    this.polyline.setMap(this.context.map);

    polyline.addListener(GenericEvents.onDragStart, () => {
      this.path = polyline
        .getPath()
        .getArray()
        .map(x => ({ lat: x.lat(), lng: x.lng() }));
    });

    polyline.addListener(GenericEvents.onDragEnd, event => {
      // eslint-disable-next-line no-param-reassign
      event.path = polyline.getPath().getArray();

      polyline.setPath(this.path);
    });

    listeners.forEach(([event, listener]) => {
      polyline.addListener(event, listener);
    });
  }

  update(prev, next) {
    const diff = getChangedProps(prev, next);
    const options = pickProps(diff);

    this.polyline.setValues(options);
  }

  detach() {
    this.polyline.setMap(null);
    this.context.maps.event.clearInstanceListeners(this.polyline);
  }
}

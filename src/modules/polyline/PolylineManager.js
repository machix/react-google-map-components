import fpPick from "lodash/fp/pick";
import GenericEvents from "../internal/GenericEvents";

import { MapManager } from "../internal/MapManager";
import { getChangedProps } from "../internal/Utils";

const pickProps = fpPick([
  "path",
  "icons",
  "zIndex",
  "visible",
  "editable",
  "geodesic",
  "clickable",
  "draggable",
  "strokeColor",
  "strokeWeight",
  "strokeOpacity",
]);

export class PolylineManager {
  constructor(props, manager: MapManager) {
    this.maps = manager.maps;
    this.manager = manager;

    const { Polyline } = this.maps;
    const options = pickProps(props);

    const polyline = new Polyline(options);

    let path;

    polyline.addListener(GenericEvents.ON_DRAG_START, () => {
      path = polyline
        .getPath()
        .getArray()
        .map(x => ({ lat: x.lat(), lng: x.lng() }));
    });

    polyline.addListener(GenericEvents.ON_DRAG_END, event => {
      // eslint-disable-next-line no-param-reassign
      event.path = polyline.getPath().getArray();

      polyline.setPath(path);
    });

    this.polyline = polyline;
  }

  attach(listeners) {
    listeners.forEach(([event, listener]) => {
      this.polyline.addListener(event, listener);
    });

    this.manager.onAttach(map => {
      this.polyline.setMap(map);
    });
  }

  update(prev, next) {
    const diff = getChangedProps(prev, next);
    const options = pickProps(diff);

    this.polyline.setValues(options);
  }

  detach() {
    this.polyline.setMap(null);
    this.maps.event.clearInstanceListeners(this.polyline);

    this.polyline = null;
    this.manager = null;
  }
}

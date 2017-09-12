import fpPick from "lodash/fp/pick";

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

    this.polyline = new Polyline(options);
  }

  attach() {
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

  addListener(event, fn) {
    this.polyline.addListener(event, fn);
  }
}

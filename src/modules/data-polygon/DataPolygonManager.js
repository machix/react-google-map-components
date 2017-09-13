import fpPick from "lodash/fp/pick";
import isEqual from "lodash/isEqual";
import { MapManager } from "../internal/MapManager";
import { getChangedProps } from "../internal/Utils";

const pickStyles = fpPick([
  "editable",
  "clickable",
  "draggable",
  "fillColor",
  "fillOpacity",
  "strokeColor",
  "strokeOpacity",
  "strokeWeight",
  "zIndex",
]);

export class DataPolygonManager {
  constructor(manager: MapManager) {
    const { Data: { Feature } } = manager.maps;

    this.manager = manager;
    this.maps = manager.maps;

    this.listeners = [];

    this.feature = new Feature();
  }

  updateStyles(style) {
    this.manager.onAttach(map => {
      map.data.overrideStyle(this.feature, style);
    });
  }

  updateGeometry(props) {
    const { Data: { Polygon } } = this.maps;
    const geometry = new Polygon(props.geometry);

    this.feature.setGeometry(geometry);
  }

  attach(props, listeners) {
    this.updateGeometry(props);
    this.updateStyles(pickStyles(props));

    this.manager.onAttach(map => {
      map.data.add(this.feature);

      listeners.forEach(([event, listener]) => {
        map.data.addListener(event, x => {
          if (x.feature === this.feature) {
            listener(x);
          }
        });
      });
    });
  }

  update(prev, next) {
    const prevProps = pickStyles(prev);
    const nextProps = pickStyles(next);
    const diff = getChangedProps(prevProps, nextProps);

    this.updateStyles(diff);

    if (!isEqual(prev.geometry, next.geometry)) {
      this.updateGeometry(next);
    }
  }

  detach() {
    while (this.listeners.length > 0) {
      const listener = this.listeners.shift();

      listener.remove();
    }

    this.manager.onAttach(map => {
      map.data.remove(this.feature);
    });
  }
}

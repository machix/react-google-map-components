import fpPick from "lodash/fp/pick";
import isEqual from "lodash/isEqual";
import { MapContext } from "../internal/MapContext";
import { getChangedProps } from "../internal/Utils";

const pickStyles = fpPick([
  "clickable",
  "fillColor",
  "fillOpacity",
  "strokeColor",
  "strokeOpacity",
  "strokeWeight",
  "zIndex",
]);

export class DataPolygonManager {
  constructor(context: MapContext) {
    const { Data: { Feature } } = context.maps;

    this.listeners = [];

    this.context = context;
    this.feature = new Feature();
  }

  updateStyles(style) {
    this.context.map.data.overrideStyle(this.feature, style);
  }

  updateGeometry(props) {
    const { Data: { Polygon } } = this.context.maps;
    const geometry = new Polygon(props.geometry);

    this.feature.setGeometry(geometry);
  }

  attach(props, listeners) {
    const styles = pickStyles(props);

    this.updateStyles(styles);
    this.updateGeometry(props);

    this.context.map.data.add(this.feature);

    listeners.forEach(([event, listener]) => {
      this.addListener(event, listener);
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

  addListener(event, listener) {
    this.listeners.push(
      this.context.map.data.addListener(event, x => {
        if (x.feature === this.feature) {
          listener(x);
        }
      }),
    );
  }

  detach() {
    this.context.map.data.remove(this.feature);

    while (this.listeners.length > 0) {
      this.listeners.shift().remove();
    }
  }
}

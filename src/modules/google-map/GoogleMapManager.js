import fpPick from "lodash/fp/pick";
import has from "lodash/has";
import { MapContext } from "../internal/MapContext";
import { getChangedProps } from "../internal/Utils";

const pickProps = fpPick([
  // TODO: Implement more props
  "zoom",
  "center",
  "mapTypeId",
  "clickableIcons",
  "backgroundColor",
  "disableDoubleClickZoom",
]);

export class GoogleMapManager {
  constructor(maps) {
    this.map = null;
    this.maps = maps;
    this.context = null;
  }

  attach(node, props, listeners) {
    const { Map } = this.maps;
    const options = this.getOptions(props);

    options.disableDefaultUI = true;

    const map = new Map(node, options);

    this.map = map;
    this.context = new MapContext(map, this.maps);

    listeners.forEach(([event, listener]) => {
      map.addListener(event, listener);
    });
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);
    const options = getChangedProps(prevOptions, nextOptions);

    this.map.setValues(options);
  }

  detach() {
    this.maps.event.clearInstanceListeners(this.map);
  }

  getOptions(props) {
    const { MapTypeId } = this.maps;
    const options = pickProps(props);

    if (has(MapTypeId, options.mapTypeId)) {
      options.mapTypeId = MapTypeId[options.mapTypeId];
    }

    return options;
  }
}

import fpPick from "lodash/fp/pick";
import has from "lodash/has";
import { MapManager } from "../internal/MapManager";
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
  constructor(manager: MapManager) {
    this.manager = manager;
    this.maps = manager.maps;
  }

  getOptions(props) {
    const { MapTypeId } = this.maps;
    const options = pickProps(props);

    if (has(MapTypeId, options.mapTypeId)) {
      options.mapTypeId = MapTypeId[options.mapTypeId];
    }

    return options;
  }

  attach(node, props) {
    const options = this.getOptions(props);
    const { Map } = this.maps;

    options.disableDefaultUI = true;

    this.manager.attach(new Map(node, options));
  }

  detach() {
    this.manager.detach();
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);
    const options = getChangedProps(prevOptions, nextOptions);

    this.manager.onAttach(map => map.setValues(options));
  }

  addListener(event, fn) {
    this.manager.onAttach(map => {
      map.addListener(event, fn);

      this.manager.onDetach(() => {});
    });
  }
}

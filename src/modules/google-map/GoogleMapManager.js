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
  constructor(context: MapContext) {
    this.context = context;
    this.maps = context.maps;
  }

  getOptions(props) {
    const { MapTypeId } = this.maps;
    const options = pickProps(props);

    if (has(MapTypeId, options.mapTypeId)) {
      options.mapTypeId = MapTypeId[options.mapTypeId];
    }

    return options;
  }

  attach(node, props, listeners) {
    const options = this.getOptions(props);
    const { Map } = this.maps;

    options.disableDefaultUI = true;

    this.context.attach(new Map(node, options));
    this.context.onAttach(map => {
      listeners.forEach(([event, listener]) => {
        map.addListener(event, listener);
      });
    });
  }

  detach() {
    this.context.detach();
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);
    const options = getChangedProps(prevOptions, nextOptions);

    this.context.onAttach(map => map.setValues(options));
  }

  addListener(event, fn) {
    this.context.onAttach(map => {
      map.addListener(event, fn);

      this.context.onDetach(() => {});
    });
  }
}

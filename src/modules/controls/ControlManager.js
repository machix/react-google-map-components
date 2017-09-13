import fpPick from "lodash/fp/pick";
import isEqual from "lodash/isEqual";
import { MapContext } from "../internal/MapContext";

const pickProps = fpPick(["position"]);

export class ControlManager {
  constructor(name, context: MapContext) {
    this.name = name;
    this.context = context;
    this.maps = context.maps;
  }

  getOptions(props) {
    const options = pickProps(props);

    options.position = this.context.getEnum(
      "ControlPosition",
      options.position,
    );

    return options;
  }

  setOptions(visible, options) {
    this.context.onAttach(map => {
      const values = {
        [this.name]: visible,
        [`${this.name}Options`]: options,
      };

      map.setValues(values);
    });
  }

  attach(props) {
    const options = this.getOptions(props);

    this.setOptions(true, options);
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);

    if (!isEqual(prevOptions, nextOptions)) {
      this.setOptions(true, nextOptions);
    }
  }

  detach() {
    this.setOptions(false, {});
  }
}

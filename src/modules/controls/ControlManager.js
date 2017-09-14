import fpPick from "lodash/fp/pick";
import isEqual from "lodash/isEqual";
import { MapContext } from "../internal/MapContext";

const pickProps = fpPick(["position"]);

export class ControlManager {
  constructor(name, context: MapContext) {
    this.name = name;
    this.context = context;
  }

  attach(props) {
    this.setOptions(true, this.getOptions(props));
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

  getOptions(props) {
    const options = pickProps(props);

    options.position = this.context.getEnum(
      "ControlPosition",
      options.position,
    );

    return options;
  }

  setOptions(visible, options) {
    this.context.map.setValues({
      [this.name]: visible,
      [`${this.name}Options`]: options,
    });
  }
}

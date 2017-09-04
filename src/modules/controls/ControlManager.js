import fpPick from "lodash/fp/pick";
import isEqual from "lodash/isEqual";
import { MapManager } from "../internal/MapManager";

const pickProps = fpPick(["position"]);

export class ControlManager {
  constructor(name, manager: MapManager) {
    this.name = name;
    this.manager = manager;
    this.maps = manager.maps;
  }

  getOptions(props) {
    const options = pickProps(props);

    options.position = this.manager.getEnum(
      "ControlPosition",
      options.position,
    );

    return options;
  }

  setOptions(visible, options) {
    this.manager.onAttach(map => {
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

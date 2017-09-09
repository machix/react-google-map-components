import map from "lodash/map";
import { MapManager } from "../internal/MapManager";
import { isEqualProps } from "../internal/Utils";

export class DrawingControlManager {
  constructor(props, manager: MapManager) {
    this.maps = manager.maps;
    this.manager = manager;

    const { drawing: { DrawingManager } } = this.maps;
    const options = this.getOptions(props);

    this.drawingManager = new DrawingManager(options);
  }

  getOptions(props) {
    const manager = this.manager;
    const options = {
      position: manager.getEnum("ControlPosition", props.position),
    };

    if (props.drawingModes) {
      options.drawingModes = map(props.drawingModes, x =>
        manager.getEnum("drawing.OverlayType", x),
      );
    }

    return {
      drawingControl: true,
      drawingControlOptions: options,
    };
  }

  attach() {
    this.manager.onAttach(x => this.drawingManager.setMap(x));
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);

    if (!isEqualProps(prevOptions, nextOptions)) {
      this.drawingManager.setOptions(nextOptions);
    }
  }

  detach() {
    this.drawingManager.setMap(null);
  }

  addListener(event, fn) {
    return this.drawingManager.addListener(event, fn);
  }
}

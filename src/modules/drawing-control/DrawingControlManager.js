import map from "lodash/map";
import { MapContext } from "../internal/MapContext";
import { isEqualProps } from "../internal/Utils";
import DrawingControlEvents from "./DrawingControlEvents";

export class DrawingControlManager {
  constructor(props, context: MapContext) {
    this.maps = context.maps;
    this.context = context;

    const { drawing: { DrawingManager } } = this.maps;
    const options = this.getOptions(props);

    this.drawingManager = new DrawingManager(options);
    this.drawingManager.addListener(
      DrawingControlEvents.ON_OVERLAY_COMPLETE,
      x => x.overlay.setMap(null),
    );
  }

  getOptions(props) {
    const manager = this.context;
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

  attach(listeners) {
    listeners.forEach(([event, listener]) => {
      this.drawingManager.addListener(event, listener);
    });

    this.context.onAttach(x => this.drawingManager.setMap(x));
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

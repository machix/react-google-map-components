import map from "lodash/map";
import { MapContext } from "../internal/MapContext";
import { isEqualProps } from "../internal/Utils";
import DrawingControlEvents from "./DrawingControlEvents";

export class DrawingControlManager {
  constructor(context: MapContext) {
    const { drawing: { DrawingManager } } = context.maps;

    this.context = context;
    this.drawingManager = new DrawingManager();
  }

  attach(props, listeners) {
    const options = this.getOptions(props);
    const drawingManager = this.drawingManager;

    drawingManager.setValues(options);
    drawingManager.setMap(this.context.map);

    drawingManager.addListener(DrawingControlEvents.ON_OVERLAY_COMPLETE, x =>
      x.overlay.setMap(null),
    );

    listeners.forEach(([event, listener]) => {
      drawingManager.addListener(event, listener);
    });
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);

    if (!isEqualProps(prevOptions, nextOptions)) {
      this.drawingManager.setValues(nextOptions);
    }
  }

  detach() {
    this.drawingManager.setMap(null);
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
}

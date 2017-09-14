import fpPick from "lodash/fp/pick";
import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";
import InfoWindowEvents from "./InfoWindowEvents";

const pickProps = fpPick([
  "position",
  "maxWidth",
  "zIndex",
  "pixelOffset",
  "disableAutoPan",
]);

export class InfoWindowManager {
  constructor(context: MapContext, render) {
    const { InfoWindow } = context.maps;

    this.render = render;
    this.context = context;

    this.open = false;

    this.infoWindow = new InfoWindow();
    this.div = document.createElement("div");
  }

  attach(props, listeners) {
    const options = this.getOptions(props);
    const infoWindow = this.infoWindow;

    infoWindow.setValues(options);

    this.updateContent(props);
    this.updateVisibility(props);

    infoWindow.addListener(InfoWindowEvents.ON_CLOSE_CLICK, () => {
      infoWindow.open(this.context.map);
    });

    listeners.forEach(([event, listener]) => {
      infoWindow.addListener(event, listener);
    });
  }

  update(prev, next) {
    const options = this.getOptions(next);

    this.infoWindow.setValues(options);

    if (prev.children !== next.children) {
      this.updateContent(next);
    }

    if (
      Boolean(prev.open) !== Boolean(next.open) ||
      Boolean(prev.maxWidth !== next.maxWidth && next.open)
    ) {
      this.updateVisibility(next);
    }
  }

  detach() {
    this.infoWindow.close();
    this.context.maps.event.clearInstanceListeners(this.infoWindow);

    ReactDOM.unmountComponentAtNode(this.div);
  }

  updateContent(props) {
    let content = "";

    if (props.open) {
      if (React.isValidElement(props.children)) {
        this.render(props.children, this.div);

        content = this.div;
      } else {
        content = props.children;
      }
    }

    this.infoWindow.setContent(content);
  }

  updateVisibility(props) {
    if (props.open) {
      this.infoWindow.open(this.context.map);
    } else {
      this.infoWindow.close();
    }
  }

  getOptions(props) {
    const options = pickProps(props);

    if (options.pixelOffset) {
      options.pixelOffset = this.context.createSize(options.pixelOffset);
    }

    return options;
  }
}

import fpPick from "lodash/fp/pick";
import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";
import { getChangedProps } from "../internal/Utils";

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

    this.infoWindow = new InfoWindow();
    this.div = document.createElement("div");
  }

  attach(props, listeners) {
    const options = this.getOptions(props);
    const infoWindow = this.infoWindow;

    infoWindow.setValues(options);
    infoWindow.open(this.context.map);

    listeners.forEach(([event, listener]) => {
      infoWindow.addListener(event, listener);
    });
  }

  update(prev, next) {
    const diff = getChangedProps(prev, next);
    const options = this.getOptions(diff);

    const infoWindow = this.infoWindow;

    infoWindow.setValues(options);

    if (options.maxWidth) {
      // To change a max width we have to close info window first
      infoWindow.close();
      infoWindow.open(this.context.map);
    }
  }

  detach() {
    this.infoWindow.close();
    this.context.maps.event.clearInstanceListeners(this.infoWindow);

    ReactDOM.unmountComponentAtNode(this.div);
  }

  getContent(props) {
    const { children } = props;

    if (React.isValidElement(children)) {
      this.render(children, this.div);

      return this.div;
    }

    return children;
  }

  getOptions(props) {
    const options = pickProps(props);

    if (props.children) {
      options.content = this.getContent(props);
    }

    if (options.pixelOffset) {
      options.pixelOffset = this.context.createSize(options.pixelOffset);
    }

    return options;
  }
}

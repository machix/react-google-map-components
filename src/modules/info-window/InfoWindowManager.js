import fpPick from "lodash/fp/pick";
import isString from "lodash/isString";
import React from "react";
import ReactDOM from "react-dom";
import { MapManager } from "../internal/MapManager";
import { getChangedProps } from "../internal/Utils";

const pickProps = fpPick([
  "position",
  "maxWidth",
  "zIndex",
  "pixelOffset",
  "disableAutoPan",
]);

export class InfoWindowManager {
  constructor(manager: MapManager, render) {
    this.manager = manager;
    this.maps = manager.maps;

    this.render = render;

    this.div = document.createElement("div");
    this.infowindow = new this.maps.InfoWindow();
  }

  getContent(props) {
    const { children } = props;

    if (isString(children)) {
      return children;
    } else if (React.isValidElement(children)) {
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
      options.pixelOffset = this.manager.createSize(options.pixelOffset);
    }

    return options;
  }

  attach(props, listeners) {
    const options = this.getOptions(props);

    this.infowindow.setOptions(options);

    listeners.forEach(([event, listener]) => {
      this.infowindow.addListener(event, listener);
    });

    this.manager.onAttach(map => {
      this.infowindow.open(map);
    });
  }

  update(prev, next) {
    const diff = getChangedProps(prev, next);
    const options = this.getOptions(diff);

    if (options.maxWidth) {
      this.manager.onAttach(map => {
        this.infowindow.close();
        this.infowindow.setOptions(options);
        this.infowindow.open(map);
      });
    } else {
      this.infowindow.setOptions(options);
    }
  }

  detach() {
    this.infowindow.close();
    ReactDOM.unmountComponentAtNode(this.div);
    this.maps.event.clearInstanceListeners(this.infowindow);

    this.div = null;
    this.infowindow = null;
  }
}

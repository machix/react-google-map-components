import fpPick from "lodash/fp/pick";
import React from "react";

import { MapManager } from "../internal/MapManager";
import { getChangedProps } from "../internal/Utils";

const pickProps = fpPick([
  "position",
  "title",
  "visible",
  "clickable",
  "draggable",
  "crossOnDrag",
  "anchorPoint",
  "animation",
  "cursor",
  "icon",
  "label",
  "opacity",
  "optimized",
  "shape",
  "zIndex",
]);

export class MarkerManager {
  constructor(props, manager: MapManager) {
    this.maps = manager.maps;
    this.manager = manager;

    const { Marker } = this.maps;
    const options = this.getOptions(props);

    this.marker = new Marker(options);
  }

  getOptions(props) {
    const options = pickProps(props);
    const manager = this.manager;

    options.animation = manager.getEnum("Animation", options.animation);

    if (React.isValidElement(options.icon)) {
      options.icon = manager.createIcon(options.icon.props);
    }

    if (options.position) {
      options.position = manager.createLatLng(options.position);
    }

    if (options.anchorPoint) {
      options.anchorPoint = manager.createPoint(options.anchorPoint);
    }

    return options;
  }

  attach() {
    this.manager.onAttach(map => {
      this.marker.setMap(map);
    });
  }

  update(prev, next) {
    const diff = getChangedProps(prev, next);
    const options = this.getOptions(diff);

    this.marker.setValues(options);
  }

  detach() {
    this.marker.setMap(null);
    this.maps.event.clearInstanceListeners(this.marker);

    this.marker = null;
    this.manager = null;
  }

  addListener(event, fn) {
    this.marker.addListener(event, fn);
  }
}

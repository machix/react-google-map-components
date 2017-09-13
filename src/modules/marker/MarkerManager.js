import fpPick from "lodash/fp/pick";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { getChangedProps } from "../internal/Utils";
import MarkerEvents from "./MarkerEvents";

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
  constructor(props, context: MapContext) {
    this.maps = context.maps;
    this.context = context;

    const { Marker } = this.maps;
    const options = this.getOptions(props);

    const marker = new Marker(options);
    let position;

    marker.addListener(MarkerEvents.ON_DRAG_START, () => {
      position = marker.getPosition();
    });

    marker.addListener(MarkerEvents.ON_DRAG_END, () => {
      marker.setPosition(position);
    });

    this.marker = marker;
  }

  getOptions(props) {
    const options = pickProps(props);
    const ctx = this.context;

    options.animation = ctx.getEnum("Animation", options.animation);

    if (React.isValidElement(options.icon)) {
      options.icon = ctx.createIcon(options.icon.props);
    }

    if (options.position) {
      options.position = ctx.createLatLng(options.position);
    }

    if (options.anchorPoint) {
      options.anchorPoint = ctx.createPoint(options.anchorPoint);
    }

    return options;
  }

  attach(listeners) {
    listeners.forEach(([event, listener]) => {
      this.marker.addListener(event, listener);
    });

    this.context.onAttach(map => {
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
    this.context = null;
  }
}

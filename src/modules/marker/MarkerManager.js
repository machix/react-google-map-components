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
  constructor(context: MapContext) {
    this.context = context;

    const { Marker } = context.maps;

    this.position = null;
    this.marker = new Marker();
  }

  attach(props, listeners) {
    const options = this.getOptions(props);
    const marker = this.marker;

    marker.setValues(options);
    marker.setMap(this.context.map);

    marker.addListener(MarkerEvents.ON_DRAG_START, () => {
      this.position = marker.getPosition();
    });

    marker.addListener(MarkerEvents.ON_DRAG_END, () => {
      marker.setPosition(this.position);
    });

    listeners.forEach(([event, listener]) => {
      marker.addListener(event, listener);
    });
  }

  update(prev, next) {
    const diff = getChangedProps(prev, next);
    const options = this.getOptions(diff);

    this.marker.setValues(options);
  }

  detach() {
    this.marker.setMap(null);
    this.context.maps.event.clearInstanceListeners(this.marker);
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
}

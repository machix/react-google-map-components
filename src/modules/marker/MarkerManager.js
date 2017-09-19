import React from "react";
import fpPick from "lodash/fp/pick";
import isEqual from "lodash/isEqual";
import MarkerEvents from "./MarkerEvents";
import { MapContext } from "../internal/MapContext";
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

const pickIconProps = fpPick([
  "url",
  "anchor",
  "labelOrigin",
  "origin",
  "size",
  "scaledSize",
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

  attachIcon(props) {
    this.marker.setIcon(this.context.createIcon(props));
  }

  updateIcon(prev, next) {
    const prevIcon = pickIconProps(prev);
    const nextIcon = pickIconProps(next);

    if (!isEqual(prevIcon, nextIcon)) {
      this.marker.setIcon(this.context.createIcon(nextIcon));
    }
  }

  getOptions(props) {
    const options = pickProps(props);
    const ctx = this.context;

    options.animation = ctx.getEnum("Animation", options.animation);

    if (React.isValidElement(options.icon)) {
      delete options.icon;
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

import get from "lodash/get";
import has from "lodash/has";
import { createInitEmitter } from "./InitEmitter";

export class MapContext {
  constructor(maps) {
    this.maps = maps;

    this.attachEmmiter = createInitEmitter();
    this.detachEmitter = createInitEmitter();
  }

  attach(map) {
    this.attachEmmiter.init(map);
  }

  onAttach(fn) {
    return this.attachEmmiter.onInit(fn);
  }

  detach() {
    this.detachEmitter.init();
  }

  onDetach(fn) {
    return this.detachEmitter.onInit(fn);
  }

  createPoint(point) {
    return new this.maps.Point(point.x, point.y);
  }

  createSize(size) {
    return new this.maps.Size(size.width, size.height);
  }

  createLatLng(latLng) {
    return new this.maps.LatLng(latLng);
  }

  createLatLngBounds(latLngBounds) {
    return latLngBounds.reduce(
      (acc, x) => acc.extend(this.createLatLng(x)),
      new this.maps.LatLngBounds(),
    );
  }

  createIcon(options) {
    const icon = { url: options.url };

    if (options.anchor) {
      icon.anchor = this.createPoint(options.anchor);
    }

    if (options.labelOrigin) {
      icon.labelOrigin = this.createPoint(options.labelOrigin);
    }

    if (options.origin) {
      icon.origin = this.createPoint(options.origin);
    }

    if (options.scaledSize) {
      icon.scaledSize = this.createSize(options.scaledSize);
    }

    if (options.size) {
      icon.size = this.createSize(options.size);
    }

    return icon;
  }

  getEnum(name, value) {
    return has(this.maps[name], value) ? get(this.maps[name], value) : value;
  }
}

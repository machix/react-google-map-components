import has from "lodash/has";
import get from "lodash/get";

export class MapManager {
  constructor(maps) {
    this.map = null;
    this.maps = maps;
    this.attachQueue = [];
    this.detachQueue = [];
  }

  attach(map) {
    if (this.map) {
      throw new Error("MapManager: map instance is already initialized");
    }

    this.map = map;

    while (this.attachQueue.length > 0) {
      const fn = this.attachQueue.shift();

      fn(map);
    }
  }

  onAttach(fn) {
    if (this.map) {
      fn(this.map);
    } else {
      this.attachQueue.push(fn);
    }
  }

  detach() {
    while (this.detachQueue.length > 0) {
      const fn = this.detachQueue.shift();

      fn(this.map);
    }

    this.map = null;
  }

  onDetach(fn) {
    this.detachQueue.push(fn);
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

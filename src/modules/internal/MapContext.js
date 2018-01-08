import _ from "lodash";

export class MapContext {
  constructor(map, maps) {
    this.map = map;
    this.maps = maps;
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

  createSymbol(options) {
    const icon = {
      path: options.path,
      rotation: options.rotation,
      scale: options.scale,
      fillColor: options.fillColor,
      fillOpacity: options.fillOpacity,
      strokeColor: options.strokeColor,
      strokeOpacity: options.strokeOpacity,
      strokeWeight: options.strokeWeight,
    };

    if (options.anchor) {
      icon.anchor = this.createPoint(options.anchor);
    }

    if (options.labelOrigin) {
      icon.labelOrigin = this.createPoint(options.labelOrigin);
    }

    return icon;
  }

  getEnum(name, value) {
    return _.has(this.maps[name], value)
      ? _.get(this.maps[name], value)
      : value;
  }
}

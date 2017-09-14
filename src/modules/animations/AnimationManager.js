import { MapContext } from "../internal/MapContext";

export class AnimationManager {
  constructor(context: MapContext) {
    this.context = context;
  }

  fitBounds(latLngBounds) {
    this.context.map.fitBounds(this.context.createLatLngBounds(latLngBounds));
  }

  panBy(x, y) {
    this.context.map.panBy(x, y);
  }

  panTo(latLng) {
    this.context.map.panTo(latLng);
  }

  panToBounds(latLngBounds) {
    this.context.map.panToBounds(this.context.createLatLngBounds(latLngBounds));
  }
}

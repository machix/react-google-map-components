import { MapContext } from "../internal/MapContext";

export class AnimationManager {
  constructor(context: MapContext) {
    this.context = context;
    this.maps = context.maps;
  }

  fitBounds(latLngBounds) {
    this.context.onAttach(map => {
      map.fitBounds(this.context.createLatLngBounds(latLngBounds));
    });
  }

  panBy(x, y) {
    this.context.onAttach(map => map.panBy(x, y));
  }

  panTo(latLng) {
    this.context.onAttach(map => map.panTo(latLng));
  }

  panToBounds(latLngBounds) {
    this.context.onAttach(map => {
      map.panToBounds(this.context.createLatLngBounds(latLngBounds));
    });
  }
}

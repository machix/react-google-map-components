import { MapManager } from "../internal/MapManager";

export class AnimationManager {
  constructor(manager: MapManager) {
    this.manager = manager;
    this.maps = manager.maps;
  }

  panBy(x, y) {
    this.manager.onAttach(map => map.panBy(x, y));
  }

  panTo(latLng) {
    this.manager.onAttach(map => map.panTo(latLng));
  }

  panToBounds(latLngBounds) {
    this.manager.onAttach(map => {
      map.panToBounds(this.manager.createLatLngBounds(latLngBounds));
    });
  }
}

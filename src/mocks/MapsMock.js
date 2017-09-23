export function createMapsMock() {
  return {
    Map: jest.fn(function GoogleMapsMap(node, options) {
      this.node = node;
      this.options = options;
      this.listeners = {};

      this.setValues = jest.fn();
      this.addListener = jest.fn((event, listener) => {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(listener);
      });

      this.fitBounds = jest.fn();
      this.panBy = jest.fn();
      this.panTo = jest.fn();
      this.panToBounds = jest.fn();
    }),

    Size: jest.fn(function GoogleMapsSize(width, height) {
      this.toJS = () => ({ width, height });
    }),

    Point: jest.fn(function GoogleMapsPoint(x, y) {
      this.toJS = () => ({ x, y });
    }),

    LatLng: jest.fn(function GoogleMapsLatLng(latLng) {
      this.toJS = () => latLng;
    }),

    LatLngBounds: jest.fn(function GoogleMapsLatLngBounds() {
      this.extends = [];

      this.extend = jest.fn(latLng => {
        this.extends.push(latLng);

        return this;
      });

      this.toJS = () => this.extends.map(x => (x.toJS ? x.toJS() : x));
    }),

    event: {
      clearInstanceListeners: jest.fn(),
    },
  };
}

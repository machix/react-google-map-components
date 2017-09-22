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
    }),

    Size: jest.fn(),
    Point: jest.fn(),
    LatLng: jest.fn(),

    LatLngBounds: jest.fn(function GoogleMapsLatLngBounds() {
      this.extend = () => jest.fn();
    }),

    event: {
      clearInstanceListeners: jest.fn(),
    },
  };
}

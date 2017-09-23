const controlTypes = [
  "BOTTOM_CENTER",
  "BOTTOM_LEFT",
  "BOTTOM_RIGHT",
  "LEFT_BOTTOM",
  "LEFT_CENTER",
  "LEFT_TOP",
  "RIGHT_BOTTOM",
  "RIGHT_CENTER",
  "RIGHT_TOP",
  "TOP_CENTER",
  "TOP_LEFT",
  "TOP_RIGHT",
];

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

      this.controls = controlTypes.reduce((acc, control) => {
        const items = [];

        acc[control] = {
          items,
          push: jest.fn((...args) => {
            items.push(...args);
          }),
          indexOf: jest.fn(x => items.indexOf(x)),
          removeAt: jest.fn(index => {
            items.splice(index, 1);
          }),
        };

        return acc;
      }, {});
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

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

      this.setValues = jest.fn();

      this.listeners = {};

      this.emit = (event, x) => {
        const eventListeners = this.listeners[event];

        if (eventListeners) {
          eventListeners.forEach(fn => {
            fn(x);
          });
        }
      };

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

      this.data = {
        items: [],
        add: jest.fn(function GoogleMapsDataAdd(item) {
          this.items.push(item);
        }),
        remove: jest.fn(function GoogleMapsDataRemove(item) {
          const index = this.items.indexOf(item);

          if (index !== -1) {
            this.items.splice(index, 1);
          }
        }),

        overrideStyle: jest.fn(),

        listeners: {},

        emit(event, x) {
          const events = this.listeners[event];

          if (event) {
            events.forEach(fn => {
              fn(x);
            });
          }
        },

        addListener: jest.fn(function GoogleMapsDataAddListener(event, fn) {
          this.listeners[event] = this.listeners[event] || [];

          this.listeners[event].push(fn);

          return {
            remove: () => {
              const index = this.listeners[event].indexOf(fn);

              if (index !== -1) {
                this.listeners[event].splice(index, 1);
              }
            },
          };
        }),
      };
    }),

    Size: jest.fn(function GoogleMapsSize(width, height) {
      this.width = width;
      this.height = height;
    }),

    Point: jest.fn(function GoogleMapsPoint(x, y) {
      this.x = x;
      this.y = y;
    }),

    LatLng: jest.fn(function GoogleMapsLatLng(latLng) {
      this.lat = latLng.lat;
      this.lng = latLng.lng;
    }),

    LatLngBounds: jest.fn(function GoogleMapsLatLngBounds() {
      this.extends = [];

      this.extend = jest.fn(latLng => {
        this.extends.push(latLng);

        return this;
      });
    }),

    InfoWindow: jest.fn(function GoogleMapsInfoWindow() {
      this.open = jest.fn();
      this.close = jest.fn();

      this.setValues = jest.fn();
      this.setContent = jest.fn();

      this.listeners = {};

      this.emit = (event, x) => {
        const fns = this.listeners[event];

        if (fns) {
          fns.forEach(fn => {
            fn(x);
          });
        }
      };

      this.addListener = jest.fn((event, fn) => {
        this.listeners[event] = this.listeners[event] || [];

        this.listeners[event].push(fn);
      });
    }),

    Polyline: jest.fn(function GoogleMapsPolyline() {
      this.setMap = jest.fn();
      this.setValues = jest.fn();

      this.path = null;

      this.getPath = jest.fn(() => this.path);
      this.setPath = jest.fn(path => {
        this.path = path;
      });

      this.listeners = {};

      this.emit = (event, x) => {
        const fns = this.listeners[event];

        if (fns) {
          fns.forEach(fn => {
            fn(x);
          });
        }
      };

      this.addListener = jest.fn((event, fn) => {
        this.listeners[event] = this.listeners[event] || [];

        this.listeners[event].push(fn);
      });
    }),

    event: {
      clearInstanceListeners: jest.fn(),
    },

    ControlPosition: {
      BOTTOM_CENTER: "BOTTOM_CENTER",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      LEFT_BOTTOM: "LEFT_BOTTOM",
      LEFT_CENTER: "LEFT_CENTER",
      LEFT_TOP: "LEFT_TOP",
      RIGHT_BOTTOM: "RIGHT_BOTTOM",
      RIGHT_CENTER: "RIGHT_CENTER",
      RIGHT_TOP: "RIGHT_TOP",
      TOP_CENTER: "TOP_CENTER",
      TOP_LEFT: "TOP_LEFT",
      TOP_RIGHT: "TOP_RIGHT",
    },

    Data: {
      Polygon: jest.fn(),

      Feature: jest.fn(function GoogleMapsDataFeature() {
        this.setGeometry = jest.fn();
      }),
    },

    drawing: {
      DrawingManager: jest.fn(function GoogleMapsDrawingManager() {
        this.setMap = jest.fn();
        this.setValues = jest.fn();

        this.listeners = {};

        this.emit = (event, x) => {
          const fns = this.listeners[event];

          if (fns) {
            fns.forEach(fn => {
              fn(x);
            });
          }
        };

        this.addListener = jest.fn((event, fn) => {
          this.listeners[event] = this.listeners[event] || [];

          this.listeners[event].push(fn);
        });
      }),
    },
  };
}

import React from "react";
import { shallow } from "enzyme";

import { DataPolygon } from "../DataPolygon";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";
import DataLayerEvents from "../../data-layer/DataLayerEvents";

describe("DataPolygon", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should create feature on mount", () => {
    shallow(<DataPolygon geometry={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    expect(mapContext.map.data.add).toHaveBeenCalledTimes(1);
    expect(mapContext.map.data.add).toHaveBeenLastCalledWith(feature);

    expect(mapContext.map.data.overrideStyle).toHaveBeenCalledTimes(1);
    expect(mapContext.map.data.overrideStyle).toHaveBeenLastCalledWith(
      feature,
      { clickable: true },
    );
  });

  it("should apply default styles to feature on mount", () => {
    shallow(<DataPolygon geometry={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    expect(mapContext.map.data.overrideStyle).toHaveBeenCalledTimes(1);
    expect(mapContext.map.data.overrideStyle).toHaveBeenLastCalledWith(
      feature,
      { clickable: true },
    );
  });

  it("should apply custom styles to feature on mount", () => {
    shallow(
      <DataPolygon
        geometry={[]}
        clickable={false}
        fillColor="#000000"
        fillOpacity={0.4}
        strokeColor="#000000"
        strokeOpacity={1}
        strokeWeight={3}
      />,
      { context: { mapContext } },
    );

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    expect(mapContext.map.data.overrideStyle).toHaveBeenCalledTimes(1);
    expect(mapContext.map.data.overrideStyle).toHaveBeenLastCalledWith(
      feature,
      {
        clickable: false,
        fillColor: "#000000",
        fillOpacity: 0.4,
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWeight: 3,
      },
    );
  });

  it("should set polygon to feature on mount", () => {
    shallow(<DataPolygon geometry={[[{ lat: 1, lng: 2 }]]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    expect(mapContext.maps.Data.Polygon).toHaveBeenCalledTimes(1);
    expect(mapContext.maps.Data.Polygon).toHaveBeenLastCalledWith([
      [{ lat: 1, lng: 2 }],
    ]);

    const polygon = mapContext.maps.Data.Polygon.mock.instances[0];

    expect(feature.setGeometry).toHaveBeenCalledTimes(1);
    expect(feature.setGeometry).toHaveBeenLastCalledWith(polygon);
  });

  it("should add listeners without handlers on mount", () => {
    shallow(<DataPolygon geometry={[]} />, { context: { mapContext } });

    expect(mapContext.map.data.addListener).toHaveBeenCalledTimes(
      Object.keys(DataLayerEvents).length,
    );
  });

  it("should add listeners with handlers on mount", () => {
    const handlerNames = Object.keys(DataLayerEvents);
    const handlers = handlerNames.reduce((acc, x) => {
      acc[x] = jest.fn();

      return acc;
    }, {});

    shallow(<DataPolygon {...handlers} geometry={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    handlerNames.forEach(handler => {
      const event = DataLayerEvents[handler];

      expect(handlers[handler]).toHaveBeenCalledTimes(0);

      mapContext.map.data.emit(event, { feature: {} });

      expect(handlers[handler]).toHaveBeenCalledTimes(0);

      mapContext.map.data.emit(event, { feature });

      expect(handlers[handler]).toHaveBeenCalledTimes(1);
    });
  });

  it("should change feature styles on update", () => {
    const wrapper = shallow(<DataPolygon geometry={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    expect(mapContext.map.data.overrideStyle).toHaveBeenCalledTimes(1);
    expect(mapContext.map.data.overrideStyle).toHaveBeenLastCalledWith(
      feature,
      { clickable: true },
    );

    wrapper.setProps({
      clickable: false,
      fillColor: "#000000",
      fillOpacity: 0.4,
      strokeColor: "#000000",
      strokeOpacity: 1,
      strokeWeight: 3,
    });

    expect(mapContext.map.data.overrideStyle).toHaveBeenCalledTimes(2);
    expect(mapContext.map.data.overrideStyle).toHaveBeenLastCalledWith(
      feature,
      {
        clickable: false,
        fillColor: "#000000",
        fillOpacity: 0.4,
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWeight: 3,
      },
    );
  });

  it("should create new polygon on geometry update", () => {
    const wrapper = shallow(<DataPolygon geometry={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    expect(mapContext.maps.Data.Polygon).toHaveBeenCalledTimes(1);
    expect(mapContext.maps.Data.Polygon).toHaveBeenLastCalledWith([]);

    const polygon1 = mapContext.maps.Data.Polygon.mock.instances[0];

    expect(feature.setGeometry).toHaveBeenCalledTimes(1);
    expect(feature.setGeometry).toHaveBeenLastCalledWith(polygon1);

    wrapper.setProps({ geometry: [[{ lat: 0, lng: 1 }]] });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    expect(mapContext.maps.Data.Polygon).toHaveBeenCalledTimes(2);
    expect(mapContext.maps.Data.Polygon).toHaveBeenLastCalledWith([
      [{ lat: 0, lng: 1 }],
    ]);

    const polygon2 = mapContext.maps.Data.Polygon.mock.instances[1];

    expect(feature.setGeometry).toHaveBeenCalledTimes(2);
    expect(feature.setGeometry).toHaveBeenLastCalledWith(polygon2);
  });

  it("should remove feature on unmount", () => {
    const wrapper = shallow(<DataPolygon geometry={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Data.Feature).toHaveBeenCalledTimes(1);

    const feature = mapContext.maps.Data.Feature.mock.instances[0];

    expect(mapContext.map.data.add).toHaveBeenCalledTimes(1);
    expect(mapContext.map.data.add).toHaveBeenLastCalledWith(feature);

    wrapper.unmount();

    expect(mapContext.map.data.remove).toHaveBeenCalledTimes(1);
    expect(mapContext.map.data.remove).toHaveBeenLastCalledWith(feature);
  });

  it("should remove listeners on unmount", () => {
    const wrapper = shallow(<DataPolygon geometry={[]} />, {
      context: { mapContext },
    });

    const handlerNames = Object.keys(DataLayerEvents);

    expect(mapContext.map.data.addListener).toHaveBeenCalledTimes(
      handlerNames.length,
    );

    const { listeners } = mapContext.map.data;

    Object.keys(listeners).forEach(event => {
      const eventListeners = listeners[event];

      expect(eventListeners).toBeTruthy();
      expect(eventListeners.length).toBe(1);
    });

    wrapper.unmount();

    Object.keys(listeners).forEach(event => {
      const eventListeners = listeners[event];

      expect(eventListeners).toBeTruthy();
      expect(eventListeners.length).toBe(0);
    });
  });
});

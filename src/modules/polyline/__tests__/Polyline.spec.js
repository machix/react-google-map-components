import React from "react";
import { shallow } from "enzyme";

import { Polyline } from "../Polyline";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";
import GenericEvents from "../../internal/GenericEvents";

describe("Polyline", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should create polyline and attach it to map on mount", () => {
    shallow(<Polyline path={[]} />, { context: { mapContext } });

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    expect(polyline.setMap).toHaveBeenCalledTimes(1);
    expect(polyline.setMap).toHaveBeenLastCalledWith(mapContext.map);
  });

  it("should set default options on mount", () => {
    shallow(<Polyline path={[]} />, { context: { mapContext } });

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    expect(polyline.setValues).toHaveBeenCalledTimes(1);
    expect(polyline.setValues).toHaveBeenLastCalledWith({
      clickable: true,
      draggable: false,
      geodesic: false,
      path: [],
      visible: true,
    });
  });

  it("should set custom options on mount", () => {
    shallow(
      <Polyline
        path={[]}
        draggable
        visible={false}
        clickable={false}
        strokeWidth={1}
        strokeOpacity={1}
        strokeColor="#FF0000"
      />,
      { context: { mapContext } },
    );

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    expect(polyline.setValues).toHaveBeenCalledTimes(1);
    expect(polyline.setValues).toHaveBeenLastCalledWith({
      path: [],
      visible: false,
      draggable: true,
      geodesic: false,
      strokeOpacity: 1,
      clickable: false,
      strokeColor: "#FF0000",
    });
  });

  it("should add listeners without handlers", () => {
    shallow(<Polyline path={[]} />, { context: { mapContext } });

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    expect(Object.keys(polyline.listeners)).toEqual(
      expect.arrayContaining(
        Object.keys(GenericEvents).map(x => GenericEvents[x]),
      ),
    );
  });

  it("should add listeners with handlers", () => {
    const handlerNames = Object.keys(GenericEvents);
    const handers = handlerNames.reduce((acc, x) => {
      acc[x] = jest.fn();

      return acc;
    }, {});

    shallow(<Polyline {...handers} path={[]} />, { context: { mapContext } });

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    handlerNames.forEach(handler => {
      const event = GenericEvents[handler];

      expect(handers[handler]).toHaveBeenCalledTimes(0);

      polyline.emit(event, { event });

      expect(handers[handler]).toHaveBeenCalledTimes(1);
      expect(handers[handler]).toHaveBeenLastCalledWith({ event });
    });
  });

  it("should add `path` prop to event on drag end", () => {
    const onDragEnd = jest.fn();

    shallow(<Polyline path={[]} onDragEnd={onDragEnd} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    polyline.setPath([{ lat: 0, lng: 1 }]);

    expect(onDragEnd).toHaveBeenCalledTimes(0);

    polyline.emit(GenericEvents.onDragEnd, {});

    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(onDragEnd).toHaveBeenLastCalledWith({ path: [{ lat: 0, lng: 1 }] });
  });

  it("should update only changed options on props update", () => {
    const wrapper = shallow(<Polyline path={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    expect(polyline.setValues).toHaveBeenCalledTimes(1);
    expect(polyline.setValues).toHaveBeenLastCalledWith({
      clickable: true,
      draggable: false,
      geodesic: false,
      path: [],
      visible: true,
    });

    wrapper.setProps({ visible: true });

    expect(polyline.setValues).toHaveBeenCalledTimes(1);

    wrapper.setProps({ visible: false });

    expect(polyline.setValues).toHaveBeenCalledTimes(2);
    expect(polyline.setValues).toHaveBeenLastCalledWith({ visible: false });
  });

  it("should remove from map on unmount", () => {
    const wrapper = shallow(<Polyline path={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Polyline).toHaveBeenCalledTimes(1);

    const polyline = mapContext.maps.Polyline.mock.instances[0];

    expect(polyline.setMap).toHaveBeenCalledTimes(1);
    expect(polyline.setMap).toHaveBeenLastCalledWith(mapContext.map);

    wrapper.unmount();

    expect(polyline.setMap).toHaveBeenCalledTimes(2);
    expect(polyline.setMap).toHaveBeenLastCalledWith(null);

    expect(mapContext.maps.event.clearInstanceListeners).toHaveBeenCalledTimes(
      1,
    );
    expect(
      mapContext.maps.event.clearInstanceListeners,
    ).toHaveBeenLastCalledWith(polyline);
  });
});

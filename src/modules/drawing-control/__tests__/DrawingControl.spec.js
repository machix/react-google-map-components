import React from "react";
import { shallow } from "enzyme";
import { DrawingControl } from "../DrawingControl";
import DrawingControlEvents from "../DrawingControlEvents";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("DrawingControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should create drawing manager add attach to map", () => {
    shallow(<DrawingControl />, { context: { mapContext } });

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    expect(drawingManager.setMap).toHaveBeenCalledTimes(1);
    expect(drawingManager.setMap).toHaveBeenLastCalledWith(mapContext.map);
  });

  it("should set default options on mount", () => {
    shallow(<DrawingControl />, { context: { mapContext } });

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    expect(drawingManager.setValues).toHaveBeenCalledTimes(1);
    expect(drawingManager.setValues).toHaveBeenLastCalledWith({
      drawingControl: true,
      drawingControlOptions: {
        position: "TOP_LEFT",
        drawingModes: ["circle", "marker", "polygon", "polyline", "rectangle"],
      },
    });
  });

  it("should set custom options on mount", () => {
    shallow(
      <DrawingControl
        position="TOP_RIGHT"
        drawingModes={["polygon", "rectangle"]}
      />,
      { context: { mapContext } },
    );

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    expect(drawingManager.setValues).toHaveBeenCalledTimes(1);
    expect(drawingManager.setValues).toHaveBeenLastCalledWith({
      drawingControl: true,
      drawingControlOptions: {
        position: "TOP_RIGHT",
        drawingModes: ["polygon", "rectangle"],
      },
    });
  });

  it("should add listeners without handlers on mount", () => {
    shallow(<DrawingControl />, { context: { mapContext } });
    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    const listeners = drawingManager.listeners;

    Object.keys(DrawingControlEvents).forEach(handler => {
      const event = DrawingControlEvents[handler];
      const eventListeners = listeners[event];

      expect(eventListeners).toBeTruthy();

      if (event === DrawingControlEvents.onOverlayComplete) {
        expect(eventListeners.length).toBe(2);
      } else {
        expect(eventListeners.length).toBe(1);
      }
    });
  });

  it("should add listeners with handlers on mount", () => {
    const handlerNames = Object.keys(DrawingControlEvents);
    const handlers = handlerNames.reduce((acc, x) => {
      acc[x] = jest.fn();

      return acc;
    }, {});

    shallow(<DrawingControl {...handlers} />, { context: { mapContext } });

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    handlerNames.forEach(handler => {
      const overlay = { setMap: jest.fn() };
      const event = DrawingControlEvents[handler];

      expect(handlers[handler]).toHaveBeenCalledTimes(0);

      drawingManager.emit(event, { overlay });

      expect(handlers[handler]).toHaveBeenCalledTimes(1);
    });
  });

  it("should remove overlay from map on complete", () => {
    const onOverlayComplete = jest.fn();

    shallow(<DrawingControl onOverlayComplete={onOverlayComplete} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    Object.keys(DrawingControlEvents).forEach(handler => {
      const event = DrawingControlEvents[handler];
      const overlay = { setMap: jest.fn() };

      drawingManager.emit(event, { overlay });

      if (event === DrawingControlEvents.onOverlayComplete) {
        expect(overlay.setMap).toHaveBeenCalledTimes(1);
        expect(overlay.setMap).toHaveBeenLastCalledWith(null);
      } else {
        expect(overlay.setMap).toHaveBeenCalledTimes(0);
      }
    });
  });

  it("should change options on update", () => {
    const wrapper = shallow(<DrawingControl />, { context: { mapContext } });

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    expect(drawingManager.setValues).toHaveBeenCalledTimes(1);
    expect(drawingManager.setValues).toHaveBeenLastCalledWith({
      drawingControl: true,
      drawingControlOptions: {
        position: "TOP_LEFT",
        drawingModes: ["circle", "marker", "polygon", "polyline", "rectangle"],
      },
    });

    wrapper.setProps({
      position: "TOP_RIGHT",
      drawingModes: ["polygon", "rectangle"],
    });

    expect(drawingManager.setValues).toHaveBeenCalledTimes(2);
    expect(drawingManager.setValues).toHaveBeenLastCalledWith({
      drawingControl: true,
      drawingControlOptions: {
        position: "TOP_RIGHT",
        drawingModes: ["polygon", "rectangle"],
      },
    });
  });

  it("should ignore unknown on update", () => {
    const wrapper = shallow(<DrawingControl foo="bar" />, {
      context: { mapContext },
    });

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    expect(drawingManager.setValues).toHaveBeenCalledTimes(1);
    expect(drawingManager.setValues).toHaveBeenLastCalledWith({
      drawingControl: true,
      drawingControlOptions: {
        position: "TOP_LEFT",
        drawingModes: ["circle", "marker", "polygon", "polyline", "rectangle"],
      },
    });

    wrapper.setProps({ bar: "baz" });

    expect(drawingManager.setValues).toHaveBeenCalledTimes(1);
  });

  it("should remove drawing manager from map", () => {
    const wrapper = shallow(<DrawingControl />, { context: { mapContext } });

    expect(mapContext.maps.drawing.DrawingManager).toHaveBeenCalledTimes(1);

    const drawingManager =
      mapContext.maps.drawing.DrawingManager.mock.instances[0];

    expect(drawingManager.setMap).toHaveBeenCalledTimes(1);
    expect(drawingManager.setMap).toHaveBeenLastCalledWith(mapContext.map);

    wrapper.unmount();

    expect(drawingManager.setMap).toHaveBeenCalledTimes(2);
    expect(drawingManager.setMap).toHaveBeenLastCalledWith(null);
  });
});

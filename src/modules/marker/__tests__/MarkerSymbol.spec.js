import React from "react";
import { shallow } from "enzyme";
import { MarkerSymbol } from "../MarkerSymbol";
import { MarkerContext } from "../MarkerContext";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("MarkerSymbol", () => {
  let mapContext;
  let markerContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
    markerContext = new MarkerContext(new maps.Marker());
  });

  it("should set default marker icon options on mount", () => {
    shallow(<MarkerSymbol path="foo" />, {
      context: { mapContext, markerContext },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      scale: 1,
      path: "foo",
      rotation: 0,
      fillColor: "black",
      strokeColor: "black",
      strokeWeight: 1,
      strokeOpacity: 1,
      fillOpacity: 0,
      anchor: { x: 0, y: 0 },
      labelOrigin: { x: 0, y: 0 },
    });
  });

  it("should set custom marker icon options on mount", () => {
    shallow(
      <MarkerSymbol
        path="foo"
        scale={0.7}
        rotation={1}
        fillColor="black"
        fillOpacity={0.5}
        strokeColor="white"
        strokeWeight={2}
        strokeOpacity={3}
        anchor={{ x: 10, y: 15 }}
        labelOrigin={{ x: 20, y: 25 }}
      />,
      { context: { mapContext, markerContext } },
    );

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      path: "foo",
      scale: 0.7,
      rotation: 1,
      fillColor: "black",
      fillOpacity: 0.5,
      strokeWeight: 2,
      strokeOpacity: 3,
      strokeColor: "white",
      anchor: { x: 10, y: 15 },
      labelOrigin: { x: 20, y: 25 },
    });
  });

  it("should change icon options on update", () => {
    const wrapper = shallow(<MarkerSymbol path="foo" />, {
      context: { mapContext, markerContext },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      scale: 1,
      path: "foo",
      rotation: 0,
      fillColor: "black",
      strokeColor: "black",
      strokeWeight: 1,
      strokeOpacity: 1,
      fillOpacity: 0,
      anchor: { x: 0, y: 0 },
      labelOrigin: { x: 0, y: 0 },
    });

    wrapper.setProps({
      scale: 0.7,
      rotation: 1,
      fillColor: "black",
      fillOpacity: 0.5,
      strokeWeight: 2,
      strokeOpacity: 3,
      strokeColor: "white",
      anchor: { x: 10, y: 15 },
      labelOrigin: { x: 0, y: 0 },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(2);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      path: "foo",
      scale: 0.7,
      rotation: 1,
      fillColor: "black",
      fillOpacity: 0.5,
      strokeWeight: 2,
      strokeOpacity: 3,
      strokeColor: "white",
      anchor: { x: 10, y: 15 },
      labelOrigin: { x: 0, y: 0 },
    });
  });

  it("should not change with same icon options on update", () => {
    const wrapper = shallow(<MarkerSymbol path="foo" />, {
      context: { mapContext, markerContext },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      scale: 1,
      path: "foo",
      rotation: 0,
      fillColor: "black",
      strokeColor: "black",
      strokeWeight: 1,
      strokeOpacity: 1,
      fillOpacity: 0,
      anchor: { x: 0, y: 0 },
      labelOrigin: { x: 0, y: 0 },
    });

    wrapper.setProps({ path: "foo" });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);

    wrapper.setProps({ path: "bar" });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(2);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      scale: 1,
      path: "bar",
      rotation: 0,
      fillColor: "black",
      strokeColor: "black",
      strokeWeight: 1,
      strokeOpacity: 1,
      fillOpacity: 0,
      anchor: { x: 0, y: 0 },
      labelOrigin: { x: 0, y: 0 },
    });
  });
});

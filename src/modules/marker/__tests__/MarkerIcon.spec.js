import React from "react";
import { shallow } from "enzyme";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";
import { MarkerIcon } from "../MarkerIcon";
import { MarkerContext } from "../MarkerContext";

describe("MarkerIcon", () => {
  let mapContext;
  let markerContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
    markerContext = new MarkerContext(new maps.Marker());
  });

  it("should set default marker icon options on mount", () => {
    shallow(<MarkerIcon url="foo" />, {
      context: { mapContext, markerContext },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      url: "foo",
      origin: { x: 0, y: 0 },
    });
  });

  it("should set custom marker icon options on mount", () => {
    shallow(
      <MarkerIcon
        url="foo"
        anchor={{ x: 10, y: 15 }}
        origin={{ x: 20, y: 25 }}
        labelOrigin={{ x: 30, y: 35 }}
        size={{ width: 40, height: 45 }}
        scaledSize={{ width: 50, height: 55 }}
      />,
      { context: { mapContext, markerContext } },
    );

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      url: "foo",
      anchor: { x: 10, y: 15 },
      origin: { x: 20, y: 25 },
      labelOrigin: { x: 30, y: 35 },
      size: { height: 45, width: 40 },
      scaledSize: { height: 55, width: 50 },
    });
  });

  it("should change icon options on update", () => {
    const wrapper = shallow(<MarkerIcon url="foo" />, {
      context: { mapContext, markerContext },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      url: "foo",
      origin: { x: 0, y: 0 },
    });

    wrapper.setProps({
      url: "bar",
      anchor: { x: 10, y: 15 },
      origin: { x: 20, y: 25 },
      labelOrigin: { x: 30, y: 35 },
      size: { height: 45, width: 40 },
      scaledSize: { height: 55, width: 50 },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(2);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      url: "bar",
      anchor: { x: 10, y: 15 },
      origin: { x: 20, y: 25 },
      labelOrigin: { x: 30, y: 35 },
      size: { height: 45, width: 40 },
      scaledSize: { height: 55, width: 50 },
    });
  });

  it("should not change with same icon options on update", () => {
    const wrapper = shallow(<MarkerIcon url="foo" />, {
      context: { mapContext, markerContext },
    });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      url: "foo",
      origin: { x: 0, y: 0 },
    });

    wrapper.setProps({ url: "foo" });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(1);

    wrapper.setProps({ url: "bar" });

    expect(markerContext.marker.setIcon).toHaveBeenCalledTimes(2);
    expect(markerContext.marker.setIcon).toHaveBeenLastCalledWith({
      url: "bar",
      origin: { x: 0, y: 0 },
    });
  });
});

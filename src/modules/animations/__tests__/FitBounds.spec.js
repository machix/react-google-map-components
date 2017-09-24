import React from "react";
import { shallow } from "enzyme";
import { FitBounds } from "../FitBounds";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("FitBounds", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should fit bounds on mount", () => {
    shallow(
      <FitBounds
        latLngBounds={[
          { lat: 0, lng: 0 },
          { lat: 1, lng: 1 },
          { lat: 2, lng: 2 },
          { lat: 3, lng: 3 },
        ]}
      />,
      { context: { mapContext } },
    );

    expect(mapContext.map.fitBounds).toHaveBeenCalledTimes(1);
    expect(mapContext.maps.LatLngBounds).toHaveBeenCalledTimes(1);
    expect(mapContext.maps.LatLngBounds.mock.instances[0].extends).toEqual([
      { lat: 0, lng: 0 },
      { lat: 1, lng: 1 },
      { lat: 2, lng: 2 },
      { lat: 3, lng: 3 },
    ]);
  });

  it("should fit bounds on mount", () => {
    const wrapper = shallow(<FitBounds latLngBounds={[]} />, {
      context: { mapContext },
    });

    expect(mapContext.map.fitBounds).toHaveBeenCalledTimes(1);
    expect(mapContext.maps.LatLngBounds).toHaveBeenCalledTimes(1);
    expect(mapContext.maps.LatLngBounds.mock.instances[0].extends).toEqual([]);

    wrapper.setProps({ latLngBounds: [{ lat: 0, lng: 0 }] });

    expect(mapContext.map.fitBounds).toHaveBeenCalledTimes(2);
    expect(mapContext.maps.LatLngBounds).toHaveBeenCalledTimes(2);

    expect(mapContext.maps.LatLngBounds.mock.instances[1].extends).toEqual([
      { lat: 0, lng: 0 },
    ]);
  });
});

import React from "react";
import { shallow } from "enzyme";

import { PanTo } from "../PanTo";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("PanTo", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should pan on mount", () => {
    shallow(<PanTo latLng={{ lat: 10, lng: 15 }} />, {
      context: { mapContext },
    });

    expect(mapContext.map.panTo).toHaveBeenCalledTimes(1);
    expect(mapContext.map.panTo).toHaveBeenLastCalledWith({ lat: 10, lng: 15 });
  });

  it("should pan on update", () => {
    const wrapper = shallow(<PanTo latLng={{ lat: 10, lng: 15 }} />, {
      context: { mapContext },
    });

    expect(mapContext.map.panTo).toHaveBeenCalledTimes(1);
    expect(mapContext.map.panTo).toHaveBeenLastCalledWith({ lat: 10, lng: 15 });

    wrapper.setProps({ latLng: { lat: 15, lng: 15 } });

    expect(mapContext.map.panTo).toHaveBeenCalledTimes(2);
    expect(mapContext.map.panTo).toHaveBeenLastCalledWith({ lat: 15, lng: 15 });
  });
});

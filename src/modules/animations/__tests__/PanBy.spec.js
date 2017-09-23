import React from "react";
import { shallow } from "enzyme";

import { PanBy } from "../PanBy";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("PanBy", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should pan on mount", () => {
    shallow(<PanBy x={10} y={15} />, { context: { mapContext } });

    expect(mapContext.map.panBy).toHaveBeenCalledTimes(1);
    expect(mapContext.map.panBy).toHaveBeenLastCalledWith(10, 15);
  });

  it("should pan on update", () => {
    const wrapper = shallow(<PanBy x={10} y={15} />, {
      context: { mapContext },
    });

    expect(mapContext.map.panBy).toHaveBeenCalledTimes(1);
    expect(mapContext.map.panBy).toHaveBeenLastCalledWith(10, 15);

    wrapper.setProps({ x: 0, y: 0 });

    expect(mapContext.map.panBy).toHaveBeenCalledTimes(2);
    expect(mapContext.map.panBy).toHaveBeenLastCalledWith(0, 0);
  });
});

import React from "react";
import { shallow } from "enzyme";

import { Control } from "../Control";
import { ScaleControl } from "../ScaleControl";

import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("ScaleControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should set default values on mount", () => {
    const wrapper = shallow(<ScaleControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "scaleControl",
      options: {},
    });
  });
});

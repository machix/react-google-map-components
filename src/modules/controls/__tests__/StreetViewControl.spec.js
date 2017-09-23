import React from "react";
import { shallow } from "enzyme";

import { Control } from "../Control";
import { StreetViewControl } from "../StreetViewControl";

import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("StreetViewControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should set default values on mount", () => {
    const wrapper = shallow(<StreetViewControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "streetViewControl",
      options: { position: "TOP_LEFT" },
    });
  });

  it("should set custom values on mount", () => {
    const wrapper = shallow(<StreetViewControl position="RIGHT_BOTTOM" />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "streetViewControl",
      options: { position: "RIGHT_BOTTOM" },
    });
  });

  it("should set values on update", () => {
    const wrapper = shallow(<StreetViewControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "streetViewControl",
      options: { position: "TOP_LEFT" },
    });

    wrapper.setProps({ position: "RIGHT_BOTTOM" });

    expect(wrapper.find(Control).props()).toEqual({
      name: "streetViewControl",
      options: { position: "RIGHT_BOTTOM" },
    });
  });
});

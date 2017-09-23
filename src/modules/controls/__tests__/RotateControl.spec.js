import React from "react";
import { shallow } from "enzyme";

import { Control } from "../Control";
import { RotateControl } from "../RotateControl";

import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("RotateControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should set default values on mount", () => {
    const wrapper = shallow(<RotateControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "rotateControl",
      options: { position: "TOP_LEFT" },
    });
  });

  it("should set custom values on mount", () => {
    const wrapper = shallow(<RotateControl position="RIGHT_BOTTOM" />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "rotateControl",
      options: { position: "RIGHT_BOTTOM" },
    });
  });

  it("should set values on update", () => {
    const wrapper = shallow(<RotateControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "rotateControl",
      options: { position: "TOP_LEFT" },
    });

    wrapper.setProps({ position: "RIGHT_BOTTOM" });

    expect(wrapper.find(Control).props()).toEqual({
      name: "rotateControl",
      options: { position: "RIGHT_BOTTOM" },
    });
  });
});

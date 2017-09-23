import React from "react";
import { shallow } from "enzyme";

import { Control } from "../Control";
import { FullscreenControl } from "../FullscreenControl";

import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("FullscreenControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should set default values on mount", () => {
    const wrapper = shallow(<FullscreenControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "fullscreenControl",
      options: { position: "RIGHT_TOP" },
    });
  });

  it("should set custom values on mount", () => {
    const wrapper = shallow(<FullscreenControl position="RIGHT_BOTTOM" />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "fullscreenControl",
      options: { position: "RIGHT_BOTTOM" },
    });
  });

  it("should set values on update", () => {
    const wrapper = shallow(<FullscreenControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "fullscreenControl",
      options: { position: "RIGHT_TOP" },
    });

    wrapper.setProps({ position: "RIGHT_BOTTOM" });

    expect(wrapper.find(Control).props()).toEqual({
      name: "fullscreenControl",
      options: { position: "RIGHT_BOTTOM" },
    });
  });
});

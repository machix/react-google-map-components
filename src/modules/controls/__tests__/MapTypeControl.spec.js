import React from "react";
import { shallow } from "enzyme";

import { Control } from "../Control";
import { MapTypeControl } from "../MapTypeControl";

import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("MapTypeControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should set default values on mount", () => {
    const wrapper = shallow(<MapTypeControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "mapTypeControl",
      options: {
        style: "DEFAULT",
        position: "TOP_RIGHT",
        mapTypeIds: ["HYBRID", "ROADMAP", "SATELLITE", "TERRAIN"],
      },
    });
  });

  it("should set custom values on mount", () => {
    const wrapper = shallow(
      <MapTypeControl
        position="RIGHT_BOTTOM"
        controlStyle="DROPDOWN_MENU"
        mapTypeIds={["HYBRID", "ROADMAP"]}
      />,
      { context: { mapContext } },
    );

    expect(wrapper.find(Control).props()).toEqual({
      name: "mapTypeControl",
      options: {
        style: "DROPDOWN_MENU",
        position: "RIGHT_BOTTOM",
        mapTypeIds: ["HYBRID", "ROADMAP"],
      },
    });
  });

  it("should set values on update", () => {
    const wrapper = shallow(<MapTypeControl />, {
      context: { mapContext },
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "mapTypeControl",
      options: {
        style: "DEFAULT",
        position: "TOP_RIGHT",
        mapTypeIds: ["HYBRID", "ROADMAP", "SATELLITE", "TERRAIN"],
      },
    });

    wrapper.setProps({
      position: "RIGHT_BOTTOM",
      controlStyle: "DROPDOWN_MENU",
      mapTypeIds: ["HYBRID", "ROADMAP"],
    });

    expect(wrapper.find(Control).props()).toEqual({
      name: "mapTypeControl",
      options: {
        style: "DROPDOWN_MENU",
        position: "RIGHT_BOTTOM",
        mapTypeIds: ["HYBRID", "ROADMAP"],
      },
    });
  });
});

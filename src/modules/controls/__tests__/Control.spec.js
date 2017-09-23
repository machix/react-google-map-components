import React from "react";
import { shallow } from "enzyme";

import { Control } from "../Control";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("Control", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should set values on mount", () => {
    shallow(<Control name="foo" options={{ bar: "baz" }} />, {
      context: { mapContext },
    });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(1);
    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: true,
      fooOptions: { bar: "baz" },
    });
  });

  it("should set values on update", () => {
    const wrapper = shallow(<Control name="foo" />, {
      context: { mapContext },
    });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(1);
    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: true,
      fooOptions: {},
    });

    wrapper.setProps({ options: { bar: "baz" } });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(2);
    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: true,
      fooOptions: { bar: "baz" },
    });
  });

  it("should only set changes values", () => {
    const wrapper = shallow(<Control name="foo" options={{ bar: "baz" }} />, {
      context: { mapContext },
    });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(1);
    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: true,
      fooOptions: { bar: "baz" },
    });

    wrapper.setProps({ options: { bar: "baz" } });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(1);
  });

  it("should ignore name prop changes", () => {
    const wrapper = shallow(<Control name="foo" options={{ bar: "baz" }} />, {
      context: { mapContext },
    });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(1);
    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: true,
      fooOptions: { bar: "baz" },
    });

    wrapper.setProps({ name: "noop", options: {} });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(2);
    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: true,
      fooOptions: {},
    });
  });

  it("should unset values on update", () => {
    const wrapper = shallow(<Control name="foo" options={{ bar: "baz" }} />, {
      context: { mapContext },
    });

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(1);
    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: true,
      fooOptions: { bar: "baz" },
    });

    wrapper.unmount();

    expect(mapContext.map.setValues).toHaveBeenCalledTimes(2);

    expect(mapContext.map.setValues).toHaveBeenLastCalledWith({
      foo: false,
      fooOptions: {},
    });
  });
});

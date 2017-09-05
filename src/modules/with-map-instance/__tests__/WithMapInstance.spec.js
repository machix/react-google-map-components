import { shallow } from "enzyme";
import React from "react";
import { MapManager } from "../../internal/MapManager";
import { withMapInstance } from "../WithMapInstance";

describe("withMapInstance", () => {
  const Foo = () => null;
  let mapManager: MapManager;

  beforeEach(() => {
    mapManager = new MapManager();
  });

  it("should return hoc function", () => {
    expect(withMapInstance()).toBeInstanceOf(Function);
  });

  it("should render base component", () => {
    const hoc = withMapInstance();
    const WrappedFoo = hoc(Foo);
    const wrapper = shallow(<WrappedFoo />, { context: { mapManager } });

    expect(wrapper.find(Foo).length).toBe(1);
  });

  it("should pass map instance to child", () => {
    const hoc = withMapInstance();
    const WrappedFoo = hoc(Foo);
    const wrapper = shallow(<WrappedFoo />, { context: { mapManager } });

    const map = {};

    expect(wrapper.find(Foo).prop("map")).toBeNull();
    mapManager.attach(map);
    expect(wrapper.find(Foo).prop("map")).toBe(map);
  });

  it("should passthrough each prop to the base component", () => {
    const hoc = withMapInstance();
    const WrappedFoo = hoc(Foo);

    const props = { foo: 1, bar: "baz", quoz: () => {} };
    const wrapper = shallow(<WrappedFoo {...props} />, {
      context: { mapManager },
    });

    expect(wrapper.find(Foo).prop("map")).toBeNull();
    expect(wrapper.find(Foo).prop("foo")).toBe(props.foo);
    expect(wrapper.find(Foo).prop("bar")).toBe(props.bar);
    expect(wrapper.find(Foo).prop("quoz")).toBe(props.quoz);
  });

  it("should override map prop if it passed", () => {
    const hoc = withMapInstance();
    const WrappedFoo = hoc(Foo);

    const wrapper = shallow(<WrappedFoo map="foo" bar="baz" />, {
      context: { mapManager },
    });

    expect(wrapper.find(Foo).prop("map")).toBeNull();
    expect(wrapper.find(Foo).prop("bar")).toBe("baz");
  });

  it("should unsubscribe on unmount", () => {
    const hoc = withMapInstance();
    const WrappedFoo = hoc(Foo);

    const wrapper = shallow(<WrappedFoo map="foo" bar="baz" />, {
      context: { mapManager },
    });

    expect(() => wrapper.unmount()).not.toThrow();
  });
});

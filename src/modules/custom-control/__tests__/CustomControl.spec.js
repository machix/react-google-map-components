import React from "react";
import { shallow } from "enzyme";

import { CustomControl } from "../CustomControl";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("CustomControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should render on mount", () => {
    let node = null;
    shallow(
      <CustomControl position="TOP_LEFT">
        <div ref={x => (node = x)}>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    expect(node).toBeTruthy();
    expect(node.innerHTML).toBe("Foo");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node.parentNode);
  });

  it("should change position", () => {
    let node = null;

    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div ref={x => (node = x)}>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT, TOP_CENTER } = mapContext.map.controls;

    expect(node).toBeTruthy();
    expect(node.innerHTML).toBe("Foo");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node.parentNode);

    wrapper.setProps({ position: "TOP_CENTER" });

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);

    expect(node).toBeTruthy();
    expect(TOP_CENTER.push).toHaveBeenCalledTimes(1);
    expect(TOP_CENTER.push).toHaveBeenLastCalledWith(node.parentNode);
  });

  it("should change children", () => {
    let node1 = null;

    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div ref={x => (node1 = x)}>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    expect(node1).toBeTruthy();
    expect(node1.innerHTML).toBe("Foo");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node1.parentNode);

    let node2 = null;

    wrapper.setProps({ children: <div ref={x => (node2 = x)}>Bar</div> });

    expect(node2).toBeTruthy();
    expect(node2).not.toBe(node1);
    expect(node2.innerHTML).toBe("Bar");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(0);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node2.parentNode);
  });

  it("should not render invalid children", () => {
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">Foo</CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);

    const root = TOP_LEFT.push.mock.calls[0][0];

    expect(root.outerHTML).toBe("<div></div>");

    let node = null;

    wrapper.setProps({ children: <div ref={x => (node = x)}>Bar</div> });

    expect(node).toBeTruthy();
    expect(root).toBe(node.parentNode);

    wrapper.setProps({ children: "Baz" });

    expect(node).toBeNull();
    expect(root.outerHTML).toBe("<div></div>");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(0);
  });

  it("should not render invalid position", () => {
    let node = null;

    jest.spyOn(console, "error").mockImplementationOnce(() => {});

    const wrapper = shallow(
      <CustomControl position="CENTER_BOTTOM">
        <div ref={x => (node = x)} />
      </CustomControl>,
      { context: { mapContext } },
    );

    expect(node).toBeNull();
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(1);

    wrapper.setProps({ position: "TOP_LEFT" });

    const { TOP_LEFT } = mapContext.map.controls;

    expect(node).toBeTruthy();

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node.parentNode);
  });

  it("should remove node on unmount", () => {
    let node = null;
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div ref={x => (node = x)}>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    expect(node).toBeTruthy();
    expect(node.innerHTML).toBe("Foo");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node.parentNode);

    wrapper.unmount();

    expect(node).toBeNull();

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);
  });

  it("should not add control twice", () => {
    let node = null;

    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div ref={x => (node = x)}>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT, TOP_CENTER } = mapContext.map.controls;

    expect(node).toBeTruthy();
    expect(node.innerHTML).toBe("Foo");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node.parentNode);

    TOP_CENTER.push(node.parentNode);

    wrapper.setProps({ position: "TOP_CENTER" });

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);

    expect(TOP_CENTER.push).toHaveBeenCalledTimes(1);

    expect(node).toBeTruthy();
  });

  it("should remove control only it attached", () => {
    let node = null;
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div ref={x => (node = x)}>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    expect(node).toBeTruthy();
    expect(node.innerHTML).toBe("Foo");

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(node.parentNode);

    TOP_LEFT.removeAt(0);

    wrapper.unmount();

    expect(node).toBeNull();

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);
  });
});

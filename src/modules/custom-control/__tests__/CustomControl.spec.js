import React from "react";
import { shallow } from "enzyme";
import { CustomControl } from "../CustomControl";
import { Portal } from "../../internal/Portal";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("CustomControl", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should render on mount", () => {
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;
    const portal = wrapper.find(Portal);

    expect(portal.length).toBe(1);
    expect(portal.prop("node")).toBeTruthy();
    expect(portal.prop("children")).toEqual(<div>Foo</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal.prop("node"));
  });

  it("should change position", () => {
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT, TOP_CENTER } = mapContext.map.controls;

    const portal = wrapper.find(Portal);

    expect(portal.length).toBe(1);
    expect(portal.prop("node")).toBeTruthy();
    expect(portal.prop("children")).toEqual(<div>Foo</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal.prop("node"));

    wrapper.setProps({ position: "TOP_CENTER" });

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);

    expect(portal.prop("node")).toBeTruthy();
    expect(TOP_CENTER.push).toHaveBeenCalledTimes(1);
    expect(TOP_CENTER.push).toHaveBeenLastCalledWith(portal.prop("node"));
  });

  it("should change children", () => {
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    const portal1 = wrapper.find(Portal);

    expect(portal1.length).toBe(1);
    expect(portal1.prop("node")).toBeTruthy();
    expect(portal1.prop("children")).toEqual(<div>Foo</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal1.prop("node"));

    wrapper.setProps({ children: <div>Bar</div> });

    const portal2 = wrapper.find(Portal);

    expect(portal2.length).toBe(1);
    expect(portal2.prop("node")).toBeTruthy();
    expect(portal2.prop("children")).toEqual(<div>Bar</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(0);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal2.prop("node"));
  });

  it("should not render invalid position", () => {
    jest.spyOn(console, "error").mockImplementationOnce(() => {});

    const wrapper = shallow(
      <CustomControl position="CENTER_BOTTOM">
        <div>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const portal1 = wrapper.find(Portal);

    expect(portal1.length).toBe(0);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(1);

    wrapper.setProps({ position: "TOP_LEFT" });

    const { TOP_LEFT } = mapContext.map.controls;

    const portal2 = wrapper.find(Portal);

    expect(portal2.length).toBe(1);
    expect(portal2.prop("node")).toBeTruthy();
    expect(portal2.prop("children")).toEqual(<div>Foo</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal2.prop("node"));
  });

  it("should remove node on unmount", () => {
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    const portal = wrapper.find(Portal);

    expect(portal.length).toBe(1);
    expect(portal.prop("node")).toBeTruthy();
    expect(portal.prop("children")).toEqual(<div>Foo</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal.prop("node"));

    wrapper.unmount();

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);
  });

  it("should not add control twice", () => {
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT, TOP_CENTER } = mapContext.map.controls;

    const portal1 = wrapper.find(Portal);

    expect(portal1.length).toBe(1);
    expect(portal1.prop("node")).toBeTruthy();
    expect(portal1.prop("children")).toEqual(<div>Foo</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal1.prop("node"));

    TOP_CENTER.push(portal1.prop("node"));

    wrapper.setProps({ position: "TOP_CENTER" });

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);

    const portal2 = wrapper.find(Portal);

    expect(TOP_CENTER.push).toHaveBeenCalledTimes(1);

    expect(portal2.length).toBe(1);
    expect(portal2.prop("node")).toBeTruthy();
    expect(portal2.prop("children")).toEqual(<div>Foo</div>);
  });

  it("should remove control only if it attached", () => {
    const wrapper = shallow(
      <CustomControl position="TOP_LEFT">
        <div>Foo</div>
      </CustomControl>,
      { context: { mapContext } },
    );

    const { TOP_LEFT } = mapContext.map.controls;

    const portal = wrapper.find(Portal);

    expect(portal.length).toBe(1);
    expect(portal.prop("node")).toBeTruthy();
    expect(portal.prop("children")).toEqual(<div>Foo</div>);

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.push).toHaveBeenLastCalledWith(portal.prop("node"));

    TOP_LEFT.removeAt(0);

    wrapper.unmount();

    expect(TOP_LEFT.push).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenCalledTimes(1);
    expect(TOP_LEFT.removeAt).toHaveBeenLastCalledWith(0);
  });
});

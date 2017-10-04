import React from "react";
import { shallow } from "enzyme";

import { InfoWindow } from "../InfoWindow";
import { MapContext } from "../../internal/MapContext";
import { createMapsMock } from "../../../mocks/MapsMock";
import InfoWindowEvents from "../InfoWindowEvents";
import { Portal } from "../../internal/Portal";

describe("InfoWindow", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should add info window with default options on mount", () => {
    shallow(<InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>, {
      context: { mapContext },
    });

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);

    expect(infoWindow.close).toHaveBeenCalledTimes(0);

    expect(infoWindow.setValues).toHaveBeenCalledTimes(1);
    expect(infoWindow.setValues).toHaveBeenLastCalledWith({
      disableAutoPan: false,
      position: { lat: 0, lng: 1 },
    });
  });

  it("should add info window with custom options mount", () => {
    shallow(
      <InfoWindow
        zIndex={10}
        open={false}
        maxWidth={300}
        disableAutoPan
        position={{ lat: 0, lng: 1 }}
        pixelOffset={{ width: 0, height: 10 }}
      >
        Foo
      </InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(0);
    expect(infoWindow.close).toHaveBeenCalledTimes(1);

    expect(infoWindow.setValues).toHaveBeenCalledTimes(1);
    expect(infoWindow.setValues).toHaveBeenLastCalledWith({
      zIndex: 10,
      maxWidth: 300,
      disableAutoPan: true,
      position: { lat: 0, lng: 1 },
      pixelOffset: { height: 10, width: 0 },
    });
  });

  it("should change options on update", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);

    expect(infoWindow.close).toHaveBeenCalledTimes(0);

    expect(infoWindow.setValues).toHaveBeenCalledTimes(1);
    expect(infoWindow.setValues).toHaveBeenLastCalledWith({
      disableAutoPan: false,
      position: { lat: 0, lng: 1 },
    });

    wrapper.setProps({
      zIndex: 10,
      open: false,
      maxWidth: 300,
      disableAutoPan: true,
      position: { lat: 0, lng: 1 },
      pixelOffset: { width: 0, height: 10 },
    });

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.close).toHaveBeenCalledTimes(1);

    expect(infoWindow.setValues).toHaveBeenCalledTimes(2);
    expect(infoWindow.setValues).toHaveBeenLastCalledWith({
      zIndex: 10,
      maxWidth: 300,
      disableAutoPan: true,
      position: { lat: 0, lng: 1 },
      pixelOffset: { height: 10, width: 0 },
    });
  });

  it("should render string content", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.setContent).toHaveBeenCalledTimes(1);
    expect(infoWindow.setContent).toHaveBeenLastCalledWith("Foo");

    wrapper.setProps({ children: "Bar" });

    expect(infoWindow.setContent).toHaveBeenCalledTimes(2);
    expect(infoWindow.setContent).toHaveBeenLastCalledWith("Bar");
  });

  it("should render only changed string content", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.setContent).toHaveBeenCalledTimes(1);
    expect(infoWindow.setContent).toHaveBeenLastCalledWith("Foo");

    wrapper.setProps({ children: "Foo" });

    expect(infoWindow.setContent).toHaveBeenCalledTimes(1);

    wrapper.setProps({ children: "Bar" });

    expect(infoWindow.setContent).toHaveBeenCalledTimes(2);
    expect(infoWindow.setContent).toHaveBeenLastCalledWith("Bar");
  });

  it("should render react portal if child is react element", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>
        <div>Foo</div>
      </InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    const portal1 = wrapper.find(Portal);

    expect(portal1.length).toBe(1);
    expect(portal1.prop("children")).toEqual(<div>Foo</div>);

    expect(infoWindow.setContent).toHaveBeenCalledTimes(1);
    expect(infoWindow.setContent).toHaveBeenLastCalledWith(
      portal1.prop("node"),
    );

    wrapper.setProps({ children: <div>Bar</div> });

    const portal2 = wrapper.find(Portal);

    expect(portal2.length).toBe(1);
    expect(portal2.prop("children")).toEqual(<div>Bar</div>);

    expect(infoWindow.setContent).toHaveBeenCalledTimes(2);
    expect(infoWindow.setContent).toHaveBeenLastCalledWith(
      portal2.prop("node"),
    );
  });

  it("should unmount portal on close", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>
        <div>Foo</div>
      </InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    const portal1 = wrapper.find(Portal);

    expect(portal1.length).toBe(1);
    expect(portal1.prop("children")).toEqual(<div>Foo</div>);

    expect(infoWindow.setContent).toHaveBeenCalledTimes(1);
    expect(infoWindow.setContent).toHaveBeenLastCalledWith(
      portal1.prop("node"),
    );

    wrapper.setProps({ open: false });

    const portal2 = wrapper.find(Portal);

    expect(portal2.length).toBe(0);
    expect(infoWindow.setContent).toHaveBeenCalledTimes(1);

    wrapper.setProps({ open: true });

    const portal3 = wrapper.find(Portal);

    expect(portal3.length).toBe(1);
    expect(portal3.prop("children")).toEqual(<div>Foo</div>);

    expect(infoWindow.setContent).toHaveBeenCalledTimes(1);
  });

  it("should control visibility with open prop", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);

    expect(infoWindow.close).toHaveBeenCalledTimes(0);

    wrapper.setProps({ open: false });

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.close).toHaveBeenCalledTimes(1);

    wrapper.setProps({ open: true });

    expect(infoWindow.open).toHaveBeenCalledTimes(2);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);

    expect(infoWindow.close).toHaveBeenCalledTimes(1);
  });

  it("should set only changed options on update", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.setValues).toHaveBeenCalledTimes(1);
    expect(infoWindow.setValues).toHaveBeenLastCalledWith({
      disableAutoPan: false,
      position: { lat: 0, lng: 1 },
    });

    wrapper.setProps({
      position: { lat: 0, lng: 1 },
    });

    expect(infoWindow.setValues).toHaveBeenCalledTimes(1);
  });

  it("should reopen window to apply maxWidth change if window opened", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);
    expect(infoWindow.close).toHaveBeenCalledTimes(0);

    wrapper.setProps({ maxWidth: 300 });

    expect(infoWindow.open).toHaveBeenCalledTimes(2);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);

    wrapper.setProps({ maxWidth: 300 });

    expect(infoWindow.open).toHaveBeenCalledTimes(2);

    wrapper.setProps({ maxWidth: 200 });

    expect(infoWindow.open).toHaveBeenCalledTimes(3);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);
  });

  it("should not reopen window to apply maxWidth change if window closed", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);
    expect(infoWindow.close).toHaveBeenCalledTimes(0);

    wrapper.setProps({ open: false, maxWidth: 300 });

    expect(infoWindow.open).toHaveBeenCalledTimes(1);

    wrapper.setProps({ maxWidth: 300 });

    expect(infoWindow.open).toHaveBeenCalledTimes(1);

    wrapper.setProps({ maxWidth: 200 });

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
  });

  it("should attach listeners without handlers", () => {
    shallow(<InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>, {
      context: { mapContext },
    });

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.addListener).toHaveBeenCalledTimes(2);
  });

  it("should attach listeners with handlers", () => {
    const onCloseClick = jest.fn();

    shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }} onCloseClick={onCloseClick}>
        Foo
      </InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.addListener).toHaveBeenCalledTimes(2);

    expect(onCloseClick).toHaveBeenCalledTimes(0);

    const event = {};

    infoWindow.emit(InfoWindowEvents.onCloseClick, event);

    expect(onCloseClick).toHaveBeenCalledTimes(1);
    expect(onCloseClick).toHaveBeenLastCalledWith(event);
  });

  it("should reopen info window on close when it should be open", () => {
    shallow(<InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>, {
      context: { mapContext },
    });

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(1);

    infoWindow.emit(InfoWindowEvents.onCloseClick);

    expect(infoWindow.open).toHaveBeenCalledTimes(2);
  });

  it("should not reopen info window on close when it should be closed", () => {
    shallow(
      <InfoWindow open={false} position={{ lat: 0, lng: 1 }}>
        Foo
      </InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(0);

    infoWindow.emit(InfoWindowEvents.onCloseClick);

    expect(infoWindow.open).toHaveBeenCalledTimes(0);
  });

  it("should cleanup resources on unmount", () => {
    const wrapper = shallow(
      <InfoWindow position={{ lat: 0, lng: 1 }}>Foo</InfoWindow>,
      { context: { mapContext } },
    );

    expect(mapContext.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindow = mapContext.maps.InfoWindow.mock.instances[0];

    expect(infoWindow.open).toHaveBeenCalledTimes(1);
    expect(infoWindow.open).toHaveBeenLastCalledWith(mapContext.map);

    expect(infoWindow.close).toHaveBeenCalledTimes(0);

    wrapper.unmount();

    expect(infoWindow.close).toHaveBeenCalledTimes(1);
    expect(mapContext.maps.event.clearInstanceListeners).toHaveBeenCalledTimes(
      1,
    );
    expect(
      mapContext.maps.event.clearInstanceListeners,
    ).toHaveBeenLastCalledWith(infoWindow);
  });
});

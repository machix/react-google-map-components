import React from "react";
import { mount, shallow } from "enzyme";

import { Marker } from "../Marker";
import MarkerEvents from "../MarkerEvents";
import { MarkerContext } from "../MarkerContext";

import { MapContext } from "../../internal/MapContext";
import GenericEvents from "../../internal/GenericEvents";
import { createMapsMock } from "../../../mocks/MapsMock";

describe("Marker", () => {
  let mapContext;

  beforeEach(() => {
    const maps = createMapsMock();

    mapContext = new MapContext(new maps.Map(), maps);
  });

  it("should create marker and attach it to map on mount", () => {
    shallow(<Marker position={{ lat: 0, lng: 1 }} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    expect(marker.setMap).toHaveBeenCalledTimes(1);
    expect(marker.setMap).toHaveBeenLastCalledWith(mapContext.map);
  });

  it("should set default options on mount", () => {
    shallow(<Marker position={{ lat: 0, lng: 1 }} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    expect(marker.setValues).toHaveBeenCalledTimes(1);
    expect(marker.setValues).toHaveBeenLastCalledWith({
      visible: true,
      clickable: true,
      optimized: true,
      draggable: false,
      animation: "NONE",
      crossOnDrag: true,
      position: { lat: 0, lng: 1 },
    });
  });

  it("should set custom options on mount", () => {
    shallow(
      <Marker
        position={{ lat: 0, lng: 1 }}
        label="A"
        title="Foo"
        animation="BOUNCE"
        draggable
        visible={false}
        crossOnDrag={false}
      />,
      { context: { mapContext } },
    );

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    expect(marker.setValues).toHaveBeenCalledTimes(1);
    expect(marker.setValues).toHaveBeenLastCalledWith({
      label: "A",
      title: "Foo",
      visible: false,
      clickable: true,
      optimized: true,
      draggable: true,
      animation: "BOUNCE",
      crossOnDrag: false,
      position: { lat: 0, lng: 1 },
    });
  });

  it("should add listeners without handlers", () => {
    shallow(<Marker position={{ lat: 0, lng: 1 }} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    expect(Object.keys(marker.listeners)).toEqual(
      expect.arrayContaining(
        Object.keys(MarkerEvents).map(x => MarkerEvents[x]),
      ),
    );
  });

  it("should add listeners with handlers", () => {
    const handlerNames = Object.keys(MarkerEvents);
    const handers = handlerNames.reduce((acc, x) => {
      acc[x] = jest.fn();

      return acc;
    }, {});

    shallow(<Marker {...handers} position={{ lat: 0, lng: 1 }} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    handlerNames.forEach(handler => {
      const event = MarkerEvents[handler];

      expect(handers[handler]).toHaveBeenCalledTimes(0);

      marker.emit(event, { event });

      expect(handers[handler]).toHaveBeenCalledTimes(1);
      expect(handers[handler]).toHaveBeenLastCalledWith({ event });
    });
  });

  it("should render icon if its valid react element", () => {
    const wrapper = shallow(
      <Marker position={{ lat: 0, lng: 1 }} icon={<div>Foo</div>} />,
      { context: { mapContext } },
    );

    const divWrapper = wrapper.find("div");

    expect(divWrapper.length).toBe(1);
    expect(divWrapper.text()).toBe("Foo");
  });

  it("should pass context to children", () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class Foo extends React.Component {
      static contextTypes = {
        markerContext: () => {},
      };

      render() {
        return <div>Foo</div>;
      }
    }

    const wrapper = mount(
      <Marker position={{ lat: 0, lng: 1 }} icon={<Foo />} />,
      { context: { mapContext } },
    );

    const fooWrapper = wrapper.find(Foo);

    expect(fooWrapper.length).toBe(1);
    expect(fooWrapper.instance().context.markerContext).toBeInstanceOf(
      MarkerContext,
    );
  });

  it("should reset position on drag end", () => {
    const onDragEnd = jest.fn();

    shallow(<Marker position={{ lat: 0, lng: 1 }} onDragEnd={onDragEnd} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    expect(onDragEnd).toHaveBeenCalledTimes(0);
    expect(marker.setPosition).toHaveBeenCalledTimes(0);

    marker.emit(GenericEvents.onDragEnd, {});

    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(marker.setPosition).toHaveBeenCalledTimes(1);
    expect(marker.setPosition).toHaveBeenLastCalledWith({ lat: 0, lng: 1 });
  });

  it("should update only changed options on props update", () => {
    const wrapper = shallow(<Marker position={{ lat: 0, lng: 1 }} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    expect(marker.setValues).toHaveBeenCalledTimes(1);
    expect(marker.setValues).toHaveBeenLastCalledWith({
      visible: true,
      clickable: true,
      optimized: true,
      draggable: false,
      animation: "NONE",
      crossOnDrag: true,
      position: { lat: 0, lng: 1 },
    });

    wrapper.setProps({ visible: true });

    expect(marker.setValues).toHaveBeenCalledTimes(1);

    wrapper.setProps({ visible: false });

    expect(marker.setValues).toHaveBeenCalledTimes(2);
    expect(marker.setValues).toHaveBeenLastCalledWith({ visible: false });
  });

  it("should remove from map on unmount", () => {
    const wrapper = shallow(<Marker position={{ lat: 0, lng: 1 }} />, {
      context: { mapContext },
    });

    expect(mapContext.maps.Marker).toHaveBeenCalledTimes(1);

    const marker = mapContext.maps.Marker.mock.instances[0];

    expect(marker.setMap).toHaveBeenCalledTimes(1);
    expect(marker.setMap).toHaveBeenLastCalledWith(mapContext.map);

    wrapper.unmount();

    expect(marker.setMap).toHaveBeenCalledTimes(2);
    expect(marker.setMap).toHaveBeenLastCalledWith(null);

    expect(mapContext.maps.event.clearInstanceListeners).toHaveBeenCalledTimes(
      1,
    );
    expect(
      mapContext.maps.event.clearInstanceListeners,
    ).toHaveBeenLastCalledWith(marker);
  });
});

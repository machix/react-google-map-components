import React from "react";
import { mount } from "enzyme";

import { GoogleMap } from "../GoogleMap";
import { createMapsMock } from "../../../mocks/MapsMock";
import GoogleMapEvents from "../GoogleMapEvents";

describe("GoogleMap", () => {
  let maps;

  beforeEach(() => {
    maps = createMapsMock();
  });

  describe("#componentDidMount", () => {
    it("should attach map to child div", () => {
      const wrapper = mount(
        <GoogleMap maps={maps} zoom={0} center={{ lat: 0, lng: 1 }} />,
      );

      const mapDiv = wrapper.find("div > div");

      expect(mapDiv.length).toBe(1);
      expect(maps.Map).toHaveBeenCalledTimes(1);
      expect(maps.Map).toHaveBeenLastCalledWith(mapDiv.getDOMNode());
    });

    it("should pass default options to map", () => {
      mount(<GoogleMap maps={maps} zoom={0} center={{ lat: 0, lng: 1 }} />);

      expect(maps.Map).toHaveBeenCalledTimes(1);

      const setValuesMock = maps.Map.mock.instances[0].setValues;

      expect(setValuesMock).toHaveBeenCalledTimes(1);
      expect(setValuesMock).toHaveBeenLastCalledWith({
        zoom: 0,
        center: { lat: 0, lng: 1 },
        mapTypeId: "ROADMAP",
        clickableIcons: true,
        disableDefaultUI: true,
        disableDoubleClickZoom: false,
      });
    });

    it("should pass options to map", () => {
      mount(
        <GoogleMap
          maps={maps}
          zoom={0}
          center={{ lat: 0, lng: 1 }}
          mapTypeId="HYBRID"
          clickableIcons={false}
          disableDoubleClickZoom
        />,
      );

      expect(maps.Map).toHaveBeenCalledTimes(1);

      const setValuesMock = maps.Map.mock.instances[0].setValues;

      expect(setValuesMock).toHaveBeenCalledTimes(1);
      expect(setValuesMock).toHaveBeenLastCalledWith({
        zoom: 0,
        center: { lat: 0, lng: 1 },
        mapTypeId: "HYBRID",
        clickableIcons: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
      });
    });

    it("should ignore unknown options", () => {
      mount(
        <GoogleMap
          maps={maps}
          zoom={0}
          center={{ lat: 0, lng: 1 }}
          foo="bar"
          baz={false}
        />,
      );

      expect(maps.Map).toHaveBeenCalledTimes(1);

      const setValuesMock = maps.Map.mock.instances[0].setValues;

      expect(setValuesMock).toHaveBeenCalledTimes(1);
      expect(setValuesMock).toHaveBeenLastCalledWith({
        zoom: 0,
        center: { lat: 0, lng: 1 },
        mapTypeId: "ROADMAP",
        clickableIcons: true,
        disableDefaultUI: true,
        disableDoubleClickZoom: false,
      });
    });

    it("should add listeners even if there are no handlers", () => {
      mount(<GoogleMap zoom={0} maps={maps} center={{ lat: 0, lng: 1 }} />);

      expect(maps.Map).toHaveBeenCalledTimes(1);
      expect(maps.Map.mock.instances[0].listeners).toMatchSnapshot();
    });

    it("should pass handlers", () => {
      const handlers = Object.keys(GoogleMapEvents).reduce((acc, x) => {
        acc[x] = jest.fn();

        return acc;
      }, {});

      mount(
        <GoogleMap
          zoom={0}
          maps={maps}
          {...handlers}
          center={{ lat: 0, lng: 1 }}
        />,
      );

      expect(maps.Map).toHaveBeenCalledTimes(1);

      const { listeners } = maps.Map.mock.instances[0];

      expect(listeners).toMatchSnapshot();

      Object.keys(listeners).forEach(x => {
        expect(listeners[x]).toBeTruthy();
        expect(listeners[x].length).toBe(1);

        listeners[x][0](x);
      });

      Object.keys(GoogleMapEvents).forEach(handler => {
        const event = GoogleMapEvents[handler];

        expect(handlers[handler]).toHaveBeenCalledTimes(1);
        expect(handlers[handler]).toHaveBeenLastCalledWith(event);
      });
    });
  });

  describe("#componentDidUpdate", () => {
    it("pass only changed options to map", () => {
      const options = {
        zoom: 0,
        center: { lat: 0, lng: 1 },
        disableDefaultUI: true,
        mapTypeId: "HYBRID",
        clickableIcons: false,
        disableDoubleClickZoom: false,
      };

      const wrapper = mount(<GoogleMap {...options} maps={maps} />);

      expect(maps.Map.mock.instances.length).toBe(1);

      const setValuesMock = maps.Map.mock.instances[0].setValues;

      expect(setValuesMock).toHaveBeenCalledTimes(1);
      expect(setValuesMock).toHaveBeenLastCalledWith(options);

      wrapper.setProps({ disableDoubleClickZoom: true });

      expect(setValuesMock).toHaveBeenCalledTimes(2);
      expect(setValuesMock).toHaveBeenLastCalledWith({
        disableDoubleClickZoom: true,
      });

      wrapper.setProps({ disableDoubleClickZoom: true });

      expect(setValuesMock).toHaveBeenCalledTimes(2);

      wrapper.setProps({ clickableIcons: true });

      expect(setValuesMock).toHaveBeenCalledTimes(3);
      expect(setValuesMock).toHaveBeenLastCalledWith({ clickableIcons: true });
    });
  });

  describe("componentWillUnmount", () => {
    it("should remove all listeners on unmount", () => {
      const wrapper = mount(
        <GoogleMap maps={maps} zoom={0} center={{ lat: 0, lng: 1 }} />,
      );

      expect(maps.Map).toHaveBeenCalledTimes(1);
      expect(maps.event.clearInstanceListeners).toHaveBeenCalledTimes(0);

      wrapper.unmount();

      expect(maps.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
    });
  });
});

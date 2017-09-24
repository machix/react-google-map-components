import { createMapsMock } from "../../../mocks/MapsMock";
import { MapContext } from "../MapContext";

describe("MapContext", () => {
  let map;
  let maps;

  beforeEach(() => {
    maps = createMapsMock();
    map = new maps.Map();
  });

  test("public api", () => {
    const ctx = new MapContext(map, maps);

    expect(ctx.map).toBe(map);
    expect(ctx.maps).toBe(maps);
  });

  test("#createPoint", () => {
    const ctx = new MapContext(map, maps);

    expect(maps.Point).toHaveBeenCalledTimes(0);

    ctx.createPoint({ x: 10, y: 20 });

    expect(maps.Point).toHaveBeenCalledTimes(1);
    expect(maps.Point).toHaveBeenLastCalledWith(10, 20);
  });

  test("#createSize", () => {
    const ctx = new MapContext(map, maps);

    expect(maps.Size).toHaveBeenCalledTimes(0);

    ctx.createSize({ width: 10, height: 20 });

    expect(maps.Size).toHaveBeenCalledTimes(1);
    expect(maps.Size).toHaveBeenLastCalledWith(10, 20);
  });

  test("#createLatLng", () => {
    const ctx = new MapContext(map, maps);

    expect(maps.LatLng).toHaveBeenCalledTimes(0);

    ctx.createLatLng({ lat: 10, lng: 20 });

    expect(maps.LatLng).toHaveBeenCalledTimes(1);
    expect(maps.LatLng).toHaveBeenLastCalledWith({ lat: 10, lng: 20 });
  });

  test("#createLatLngBounds", () => {
    const ctx = new MapContext(map, maps);

    expect(maps.LatLngBounds).toHaveBeenCalledTimes(0);

    ctx.createLatLngBounds([{ lat: 0, lng: 0 }, { lat: 2, lng: 2 }]);

    expect(maps.LatLngBounds).toHaveBeenCalledTimes(1);

    const extendMock = maps.LatLngBounds.mock.instances[0].extend;

    expect(maps.LatLng).toHaveBeenCalledTimes(2);
    expect(maps.LatLng.mock.calls).toEqual([
      [{ lat: 0, lng: 0 }],
      [{ lat: 2, lng: 2 }],
    ]);

    expect(extendMock).toHaveBeenCalledTimes(2);
    expect(extendMock.mock.calls).toEqual([
      [maps.LatLng.mock.instances[0]],
      [maps.LatLng.mock.instances[1]],
    ]);
  });

  describe("#createIcon", () => {
    test("url", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createIcon({ url: "foo" })).toEqual({ url: "foo" });
    });

    test("anchor", () => {
      const ctx = new MapContext(map, maps);

      const icon = ctx.createIcon({ url: "foo", anchor: { x: 10, y: 20 } });

      expect(maps.Point).toHaveBeenCalledTimes(1);
      expect(maps.Point).toHaveBeenLastCalledWith(10, 20);

      expect(icon).toEqual({
        url: "foo",
        anchor: maps.Point.mock.instances[0],
      });
    });

    test("labelOrigin", () => {
      const ctx = new MapContext(map, maps);

      const icon = ctx.createIcon({
        url: "foo",
        labelOrigin: { x: 10, y: 20 },
      });

      expect(maps.Point).toHaveBeenCalledTimes(1);
      expect(maps.Point).toHaveBeenLastCalledWith(10, 20);

      expect(icon).toEqual({
        url: "foo",
        labelOrigin: maps.Point.mock.instances[0],
      });
    });

    test("origin", () => {
      const ctx = new MapContext(map, maps);

      const icon = ctx.createIcon({ url: "foo", origin: { x: 10, y: 20 } });

      expect(maps.Point).toHaveBeenCalledTimes(1);
      expect(maps.Point).toHaveBeenLastCalledWith(10, 20);

      expect(icon).toEqual({
        url: "foo",
        origin: maps.Point.mock.instances[0],
      });
    });

    test("scaledSize", () => {
      const ctx = new MapContext(map, maps);

      const icon = ctx.createIcon({
        url: "foo",
        scaledSize: { width: 10, height: 20 },
      });

      expect(maps.Size).toHaveBeenCalledTimes(1);
      expect(maps.Size).toHaveBeenLastCalledWith(10, 20);

      expect(icon).toEqual({
        url: "foo",
        scaledSize: maps.Size.mock.instances[0],
      });
    });

    test("size", () => {
      const ctx = new MapContext(map, maps);

      const icon = ctx.createIcon({
        url: "foo",
        size: { width: 10, height: 20 },
      });

      expect(maps.Size).toHaveBeenCalledTimes(1);
      expect(maps.Size).toHaveBeenLastCalledWith(10, 20);

      expect(icon).toEqual({
        url: "foo",
        size: maps.Size.mock.instances[0],
      });
    });
  });

  describe("#createSymbol", () => {
    test("path", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo" })).toEqual({ path: "foo" });
    });

    test("rotation", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo", rotation: 10 })).toEqual({
        path: "foo",
        rotation: 10,
      });
    });

    test("scale", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo", scale: 10 })).toEqual({
        path: "foo",
        scale: 10,
      });
    });

    test("fillColor", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo", fillColor: "black" })).toEqual({
        path: "foo",
        fillColor: "black",
      });
    });

    test("fillOpacity", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo", fillOpacity: 0.5 })).toEqual({
        path: "foo",
        fillOpacity: 0.5,
      });
    });

    test("strokeColor", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo", strokeColor: "black" })).toEqual({
        path: "foo",
        strokeColor: "black",
      });
    });

    test("strokeOpacity", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo", strokeOpacity: 0.5 })).toEqual({
        path: "foo",
        strokeOpacity: 0.5,
      });
    });

    test("strokeWeight", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.createSymbol({ path: "foo", strokeWeight: 2 })).toEqual({
        path: "foo",
        strokeWeight: 2,
      });
    });

    test("anchor", () => {
      const ctx = new MapContext(map, maps);

      const icon = ctx.createSymbol({ path: "foo", anchor: { x: 10, y: 20 } });

      expect(maps.Point).toHaveBeenCalledTimes(1);
      expect(maps.Point).toHaveBeenLastCalledWith(10, 20);

      expect(icon).toEqual({
        path: "foo",
        anchor: maps.Point.mock.instances[0],
      });
    });

    test("labelOrigin", () => {
      const ctx = new MapContext(map, maps);

      const icon = ctx.createSymbol({
        path: "foo",
        labelOrigin: { x: 10, y: 20 },
      });

      expect(maps.Point).toHaveBeenCalledTimes(1);
      expect(maps.Point).toHaveBeenLastCalledWith(10, 20);

      expect(icon).toEqual({
        path: "foo",
        labelOrigin: maps.Point.mock.instances[0],
      });
    });
  });

  describe("#getEnum", () => {
    test("valid enum", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.getEnum("ControlPosition", "BOTTOM_CENTER")).toBe(
        "BOTTOM_CENTER",
      );
    });

    test("invalid enum", () => {
      const ctx = new MapContext(map, maps);

      expect(ctx.getEnum("ControlPosition", "FOO")).toBe("FOO");
    });
  });
});

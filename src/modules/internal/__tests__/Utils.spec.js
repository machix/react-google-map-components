import React from "react";
import {
  createListener,
  createListeners,
  getChangedProps,
  isEqualProps,
} from "../Utils";

describe("Utils", () => {
  describe("isEqualProps", () => {
    it("should compare react elements strictly", () => {
      const foo = <div />;

      expect(isEqualProps(foo, foo)).toBe(true);
      expect(isEqualProps(foo, <div />)).toBe(false);
      expect(isEqualProps(<div />, <div />)).toBe(false);
    });

    it("should use `equals` method of object", () => {
      const foo = { equals: jest.fn(() => true) };

      expect(isEqualProps(foo, null)).toBe(false);

      expect(foo.equals).toHaveBeenCalledTimes(0);

      expect(isEqualProps(foo, { bar: 1 })).toBe(true);

      expect(foo.equals).toHaveBeenCalledTimes(1);
      expect(foo.equals).toHaveBeenLastCalledWith({ bar: 1 });
    });
  });

  describe("getChangedProps", () => {
    it("should return object with changed props", () => {
      expect(getChangedProps({ foo: 1, bar: 2 }, { foo: 1, bar: 3 })).toEqual({
        bar: 3,
      });
    });
    it("should return null if props are same", () => {
      expect(getChangedProps({ foo: 1 }, { foo: 1 })).toBeNull();
    });
  });

  describe("createListener", () => {
    it("should create function that takes handler", () => {
      const handler = jest.fn();
      const getHandler = jest.fn(() => handler);

      const listener = createListener(getHandler);

      expect(listener).toBeInstanceOf(Function);
      expect(getHandler).toHaveBeenCalledTimes(0);
      expect(handler).toHaveBeenCalledTimes(0);

      listener({ foo: "bar" });

      expect(getHandler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenLastCalledWith({ foo: "bar" });
    });

    it("should create function without handler", () => {
      const getHandler = jest.fn();

      const listener = createListener(getHandler);

      expect(listener).toBeInstanceOf(Function);
      expect(getHandler).toHaveBeenCalledTimes(0);

      listener({ foo: "bar" });

      expect(getHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("createListeners", () => {
    it("should create function that takes handler", () => {
      const events = { onFoo: "foo", onBar: "bar" };
      const handlers = { onFoo: jest.fn() };
      const getHandler = jest.fn(x => handlers[x]);

      const listeners = createListeners(events, getHandler);

      expect(listeners).toBeTruthy();

      expect(listeners.length).toBe(2);
      expect(listeners.map(x => x[0])).toEqual(
        expect.arrayContaining(["foo", "bar"]),
      );

      const eventHandlerMap = Object.keys(events).reduce((acc, handler) => {
        acc[events[handler]] = handler;

        return acc;
      }, {});

      listeners.forEach(x => {
        const event = x[0];
        const listener = x[1];
        const handlerName = eventHandlerMap[event];

        expect(handlerName).toBeTruthy();
        expect(listener).toBeInstanceOf(Function);

        const handler = handlers[handlerName];

        if (handler) {
          expect(handler).toHaveBeenCalledTimes(0);

          listener({ foo: "bar" });

          expect(handler).toHaveBeenCalledTimes(1);
          expect(handler).toHaveBeenLastCalledWith({ foo: "bar" });
        } else {
          expect(() => listener({ foo: "bar" })).not.toThrow();
        }
      });
    });
  });
});

import { createInitEmitter } from "../InitEmitter";

describe("InitEmitter", () => {
  it("should pass init arguments to init listeners", () => {
    const emitter = createInitEmitter();
    const fn = jest.fn();

    emitter.onInit(fn);
    emitter.init("a", "b", "c");

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("a", "b", "c");
  });

  it("should immediately call listener if emitter is initialized", () => {
    const emitter = createInitEmitter();
    const fn = jest.fn();

    emitter.init("a", "b", "c");
    emitter.onInit(fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("a", "b", "c");
  });

  it("should throw on second initialize", () => {
    const emitter = createInitEmitter();

    expect(() => emitter.init()).not.toThrow();
    expect(() => emitter.init()).toThrowErrorMatchingSnapshot();
  });

  it("should return unsubscribe function", () => {
    const emitter = createInitEmitter();
    const fn = jest.fn();

    const unsubsctibe = emitter.onInit(fn);

    expect(fn).toHaveBeenCalledTimes(0);

    unsubsctibe();

    expect(fn).toHaveBeenCalledTimes(0);

    emitter.init();

    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("should when listener is not a function", () => {
    const emitter = createInitEmitter();

    expect(() => emitter.onInit()).toThrowErrorMatchingSnapshot();
    expect(() => emitter.onInit(null)).toThrowErrorMatchingSnapshot();
  });
});

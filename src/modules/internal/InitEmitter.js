import noop from "lodash/noop";
import pull from "lodash/pull";
import isFunction from "lodash/isFunction";

export const createInitEmitter = () => {
  let initArgs = null;

  const queue = [];

  return { init, onInit };

  function init(...args) {
    if (initArgs !== null) {
      throw new Error("Emitter is already initialized");
    }

    initArgs = args;

    while (queue.length > 0) {
      const fn = queue.shift();

      fn(...args);
    }
  }

  function onInit(fn) {
    if (!isFunction(fn)) {
      throw new Error("Expected init listener to be a function.");
    }

    if (initArgs) {
      fn(...initArgs);

      return noop;
    }

    queue.push(fn);

    return () => {
      pull(queue, fn);
    };
  }
};

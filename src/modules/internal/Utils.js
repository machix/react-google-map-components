import React from "react";
import _ from "lodash";

// eslint-disable-next-line consistent-return
const isEqualPropsCustomizer = (a, b) => {
  // Do not compare react nodes
  if (React.isValidElement(a) || React.isValidElement(b)) {
    return a === b;
  }

  if (a && b && _.isFunction(a.equals)) {
    return a.equals(b);
  }
};

export const isEqualProps = (a, b) =>
  _.isEqualWith(a, b, isEqualPropsCustomizer);

export const getChangedProps = (prev, next) => {
  const prevKeys = _.keys(prev);
  const nextKeys = _.keys(next);
  const allKeys = _.union(prevKeys, nextKeys);
  let hasDiff = false;
  const diff = {};

  allKeys.forEach(key => {
    if (!isEqualProps(prev[key], next[key])) {
      hasDiff = true;

      diff[key] = next[key];
    }
  }, {});

  return hasDiff ? diff : null;
};

export const createListener = getHandler => x => {
  const fn = getHandler();

  if (fn) {
    fn(x);
  }
};

export const createListeners = (events, getHandler) =>
  _.keys(events).map(handler => {
    const event = events[handler];

    return [event, createListener(() => getHandler(handler))];
  });

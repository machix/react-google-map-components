import React from "react";
import keys from "lodash/keys";
import union from "lodash/union";
import isFunction from "lodash/isFunction";
import isEqualWith from "lodash/isEqualWith";

// eslint-disable-next-line consistent-return
const isEqualPropsCustomizer = (a, b) => {
  // Do not compare react nodes
  if (React.isValidElement(a) && React.isValidElement(b)) {
    return false;
  }

  if (a && b && isFunction(a.equals)) {
    return a.equals(b);
  }
};

export const isEqualProps = (a, b) => isEqualWith(a, b, isEqualPropsCustomizer);

export const getChangedProps = (prev, next) => {
  const prevKeys = keys(prev);
  const nextKeys = keys(next);
  const allKeys = union(prevKeys, nextKeys);

  return allKeys.reduce((acc, key) => {
    if (!isEqualProps(prev[key], next[key])) {
      acc[key] = next[key];
    }

    return acc;
  }, {});
};

export const createListener = getHandler => x => {
  const fn = getHandler();

  if (fn) {
    fn(x);
  }
};

export const createListeners = (events, getHandler) =>
  keys(events).map(handler => {
    const event = events[handler];

    return [event, createListener(() => getHandler(handler))];
  });

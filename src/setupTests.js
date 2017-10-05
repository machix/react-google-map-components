/* eslint-disable import/no-extraneous-dependencies,global-require,import/no-dynamic-require,prettier/prettier */

import "raf/polyfill";

import { configure } from "enzyme";

if (process.env.REACT_VERSION === "15") {
  jest.mock("react", () => require("react-15"));
  jest.mock("react/lib/React", () => require("react-15/lib/React"), {
    virtual: true,
  });
  jest.mock(
    "react/lib/ReactCurrentOwner",
    () => require("react-15/lib/ReactCurrentOwner"),
    { virtual: true },
  );
  jest.mock(
    "react/lib/ReactComponentTreeHook",
    () => require("react-15/lib/ReactComponentTreeHook"),
    { virtual: true },
  );
  jest.mock(
    "react/lib/getNextDebugID",
    () => require("react-15/lib/getNextDebugID"),
    { virtual: true },
  );

  jest.mock("react-dom", () => require("react-dom-15"));
  jest.mock("react-dom/server", () => require("react-dom-15/server"));
  jest.mock("react-dom/test-utils", () => require("react-dom-15/test-utils"));
  jest.mock("react-test-renderer", () => require("react-test-renderer-15"));
  jest.mock("react-test-renderer/shallow", () =>
    require("react-test-renderer-15/shallow"),
  );

  const Adapter = require("enzyme-adapter-react-15");

  configure({ adapter: new Adapter() });
} else {
  const Adapter = require("enzyme-adapter-react-16");

  configure({ adapter: new Adapter() });
}

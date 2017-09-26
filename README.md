# **react-google-map-components**

[![build status](https://img.shields.io/travis/umidbekkarimov/react-google-map-components/master.svg?style=flat-square)](https://travis-ci.org/umidbekkarimov/react-google-map-components)
[![npm version](https://img.shields.io/npm/v/react-google-map-components.svg?style=flat-square)](https://www.npmjs.com/package/react-google-map-components)
[![npm downloads](https://img.shields.io/npm/dm/react-google-map-components.svg?style=flat-square)](https://www.npmjs.com/package/react-google-map-components)
[![Codecov](https://img.shields.io/codecov/c/gh/umidbekkarimov/react-google-map-components.svg?style=flat-square)](https://codecov.io/gh/umidbekkarimov/react-google-map-components)

Declarative React Google Map Components.

## Installation

With yarn:


```bash
yarn add react-google-map-components
```

With npm:


```bash
npm install --save react-google-map-components
```

## WIP Alert

Not all Google Map components are ported (See [#1](https://github.com/umidbekkarimov/react-google-map-components/issues/1)).

## Usage

```javascript
import React from "react";
import { Motion, spring } from "react-motion";
import {
  GoogleMap,
  Polyline,
  CustomControl,
} from "react-google-map-components";

export default class DirectionMap extends React.Component {
  state = { step: 0 };

  render() {
    const { step } = this.state;
    const { maps, path, style, center } = this.props;

    return (
      <GoogleMap zoom={9} maps={maps} style={style} center={center}>
        <Polyline path={path} strokeOpacity={0.3} />

        <CustomControl position="BOTTOM_CENTER">
          {step === 0 ? (
            <button onClick={() => this.setState({ step: path.length - 1 })}>
              Start
            </button>
          ) : (
            <button onClick={() => this.setState({ step: 0 })}>Revert</button>
          )}
        </CustomControl>

        <Motion
          defaultStyle={{ position: 0 }}
          style={{ position: spring(step, { stiffness: 10, damping: 26 }) }}
        >
          {x => <Polyline path={path.slice(0, x.position)} />}
        </Motion>
      </GoogleMap>
    );
  }
}
```

Check [documentation](http://umidbekkarimov.github.io/react-google-map-components) page for more examples.

## Touch Events not working?

```javascript
if (window.navigator) {
  /**
   * Make mouse work with google maps in Windows touch devices.
   *
   * @link http://stackoverflow.com/a/37611736/1709679
   */
  window.navigator.msPointerEnabled = true;

  /**
   * Make touch/pan/zoom work with google maps work in Windows touch devices.
   *
   * @link https://code.google.com/p/gmaps-api-issues/issues/detail?id=6425
   */
  window.navigator.msMaxTouchPoints = window.navigator.msMaxTouchPoints || 2;
}
```

## Minimizing Bundle Size

If you're bundling your app with Rollup or webpack and don't want to manually chery pick modules you're using, you can use babel plugin that will do it for you.

```json
{
  "plugins": [
    ["direct-import", ["react-google-map-components"]]
  ]
}
```

## Contributing

```bash
# Install dependencies
yarn install

# Run local server at localhost:3000
yarn start

# Components are located in src/modules
mkdir src/modules/new-component
# Examples are located in src/docs/components/pages
mkdir src/docs/components/pages/new-component

# Format, lint, test and build before commit.
yarn all
```

## Related Projects

* https://github.com/istarkov/google-map-react
* https://github.com/tomchentw/react-google-maps

## Licence

MIT

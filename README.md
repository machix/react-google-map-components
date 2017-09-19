# **react-google-map-components**

[![build status](https://img.shields.io/travis/umidbekkarimov/react-google-map-components/master.svg?style=flat-square)](https://travis-ci.org/umidbekkarimov/react-google-map-components)
[![npm version](https://img.shields.io/npm/v/react-google-map-components.svg?style=flat-square)](https://www.npmjs.com/package/react-google-map-components)
[![npm downloads](https://img.shields.io/npm/dm/react-google-map-components.svg?style=flat-square)](https://www.npmjs.com/package/react-google-map-components)
[![Codecov](https://img.shields.io/codecov/c/gh/umidbekkarimov/react-google-map-components.svg?style=flat-square)](https://codecov.io/gh/umidbekkarimov/react-google-map-components)

Declarative React Google Map Components.

## Installation

With yarn:


```bash
yarn add --save react-google-map-components
```

With npm:


```bash
npm install --save react-google-map-components
```

## WIP Alert

1. Not all Google Map components are ported (See [#1](https://github.com/umidbekkarimov/react-google-map-components/issues/1)).
2. Low code coverage (See [codecov](https://codecov.io/gh/umidbekkarimov/react-google-map-components)). 

## Usage

```javascript
import React from "react";
import PropTypes from "prop-types";
import {
  Marker,
  GoogleMap, 
  ZoomControl, 
  DrawingControl
} from "react-google-map-components"

GoogleMapWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
}

export default function PinMap(props) {
  return (
    <GoogleMap maps={google.maps}>
      <ZoomControl />
    
      <Marker position={props.center} />  
    
      <DrawingControl 
        drawingModes={[ 'marker' ]}
        onMarkerComplete={x => {
          props.onChange({ lat: x.position.lat(), lng: x.position.lng() })
        }}
      />
    </GoogleMap>
  );
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

# Runs format, lint, test and build commands.
yarn all

# Components are located in src/modules
mkdir src/modules/new-component
# Examples are located in src/docs/components/pages
mkdir src/docs/components/pages/new-component
```

## Related Projects

* https://github.com/istarkov/google-map-react
* https://github.com/tomchentw/react-google-maps

## Licence

MIT
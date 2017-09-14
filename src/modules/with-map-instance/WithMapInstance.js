import React from "react";
import PropTypes from "prop-types";
import { MapContext } from "../internal/MapContext";

export function withMapInstance() {
  return BaseComponent => {
    WithMapInstance.contextTypes = {
      mapContext: PropTypes.instanceOf(MapContext).isRequired,
    };

    function WithMapInstance(props, context) {
      return <BaseComponent {...props} map={context.mapContext.map} />;
    }

    return WithMapInstance;
  };
}

import map from "lodash/map";
import PropTypes from "prop-types";

import React from "react";
import { MapContext } from "../internal/MapContext";
import {
  ControlPositionType,
  MapTypeControlStyleType,
  MapTypeIdType,
} from "../internal/Props";
import { ControlManager } from "./ControlManager";

export class MapTypeControlManager extends ControlManager {
  constructor(context: MapContext) {
    super("mapTypeControl", context);
  }

  getOptions(props) {
    const ctx = this.context;
    const options = super.getOptions(props);

    options.style = ctx.getEnum("MapTypeControlStyle", props.style);

    if (props.mapTypeIds) {
      options.mapTypeIds = map(props.mapTypeIds, x =>
        ctx.getEnum("MapTypeId", x),
      );
    }

    return options;
  }
}

export class MapTypeControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new MapTypeControlManager(context.mapContext);
  }

  componentDidMount() {
    this.manager.attach(this.props);
  }

  componentDidUpdate(prevProps) {
    this.manager.update(prevProps, this.props);
  }

  componentWillUnmount() {
    this.manager.detach();
  }

  render() {
    return null;
  }
}

MapTypeControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  MapTypeControl.propTypes = {
    /**
     * Position id. Used to specify the position of the control on the map.
     */
    position: ControlPositionType,
    /**
     * Style id. Used to select what style of map type control to display.
     */
    style: MapTypeControlStyleType,
    /**
     * IDs of map types to show in the control.
     */
    mapTypeIds: PropTypes.arrayOf(MapTypeIdType),
  };
}

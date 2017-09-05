import map from "lodash/map";
import PropTypes from "prop-types";

import React from "react";
import { MapManager } from "../internal/MapManager";
import {
  ControlPositionType,
  MapTypeControlStyleType,
  MapTypeIdType,
} from "../internal/Props";
import { ControlManager } from "./ControlManager";

export class MapTypeControlManager extends ControlManager {
  constructor(manager: MapManager) {
    super("mapTypeControl", manager);
  }

  getOptions(props) {
    const manager = this.manager;
    const options = super.getOptions(props);

    options.style = manager.getEnum("MapTypeControlStyle", options.style);

    if (props.mapTypeIds) {
      options.mapTypeIds = map(props.mapTypeIds, x =>
        manager.getEnum("MapTypeId", x),
      );
    }

    return options;
  }
}

export class MapTypeControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new MapTypeControlManager(context.mapManager);
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
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  MapTypeControl.propTypes = {
    position: ControlPositionType,
    style: MapTypeControlStyleType,
    mapTypeIds: PropTypes.arrayOf(MapTypeIdType),
  };
}

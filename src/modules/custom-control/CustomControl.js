import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";
import { ControlPositionType } from "../internal/Props";
import { CustomControlManager } from "./CustomControlManager";

export class CustomControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new CustomControlManager(
      context.mapContext,
      (element, container) => {
        ReactDOM.unstable_renderSubtreeIntoContainer(
          this,
          React.Children.only(element),
          container,
        );
      },
    );
  }

  componentDidMount() {
    this.manager.attach(this.props);
  }

  componentDidUpdate(prevProps) {
    this.manager.update(prevProps, this.props);
  }

  componentWillUnmount() {
    this.manager.detach(this.props);
  }

  render() {
    return null;
  }
}

CustomControl.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  CustomControl.propTypes = {
    /**
     * Content of control.
     */
    children: PropTypes.node.isRequired,

    /**
     * Position id. Used to specify the position of the control on the map.
     */
    position: ControlPositionType.isRequired,
  };
}

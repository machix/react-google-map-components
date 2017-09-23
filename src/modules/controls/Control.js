import React from "react";
import PropTypes from "prop-types";

import { MapContext } from "../internal/MapContext";
import { isEqualProps } from "../internal/Utils";

export class Control extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.name = props.name;
  }

  componentWillMount() {
    this.setOptions(true, this.props.options);
  }

  shouldComponentUpdate(nextProps) {
    const { options } = this.props;

    return !isEqualProps(options, nextProps.options);
  }

  componentWillUpdate(nextProps) {
    this.setOptions(true, nextProps.options);
  }

  componentWillUnmount() {
    this.setOptions(false, {});
  }

  setOptions(visible, options) {
    this.context.mapContext.map.setValues({
      [this.name]: visible,
      [`${this.name}Options`]: options,
    });
  }

  render() {
    return null;
  }
}

Control.contextTypes = {
  mapContext: PropTypes.instanceOf(MapContext).isRequired,
};

Control.defaultProps = {
  options: {},
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  Control.propTypes = {
    options: PropTypes.object,
    name: PropTypes.string.isRequired,
  };
}

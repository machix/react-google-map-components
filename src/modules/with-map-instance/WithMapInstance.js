import React from "react";
import PropTypes from "prop-types";
import { MapContext } from "../internal/MapContext";

export function withMapInstance() {
  return BaseComponent => {
    class WithMapInstance extends React.Component {
      constructor(props, context) {
        super(props, context);

        this.state = { map: null };
      }

      componentWillMount() {
        this.unsubscribe = this.context.mapContext.onAttach(map => {
          this.setState({ map });
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <BaseComponent {...this.props} map={this.state.map} />;
      }
    }

    WithMapInstance.contextTypes = {
      mapContext: PropTypes.instanceOf(MapContext).isRequired,
    };

    return WithMapInstance;
  };
}

import React from "react";
import PropTypes from "prop-types";
import { MapManager } from "../internal/MapManager";

export function withMapInstance() {
  return BaseComponent => {
    class WithMapInstance extends React.Component {
      constructor(props, context) {
        super(props, context);

        this.state = { map: null };
        this.manager = context.mapManager;
      }

      componentWillMount() {
        this.unsubscribe = this.manager.onAttach(map => {
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
      mapManager: PropTypes.instanceOf(MapManager).isRequired,
    };

    return WithMapInstance;
  };
}

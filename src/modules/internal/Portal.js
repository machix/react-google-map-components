import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export class Portal extends React.Component {
  componentDidMount() {
    this.renderNode();
  }

  shouldComponentUpdate(nextProps) {
    const { node, children } = this.props;

    return nextProps.node !== node || nextProps.children !== children;
  }

  componentWillUpdate(prevProps) {
    this.renderNode(prevProps);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.props.node);
  }

  renderNode({ node, children } = this.props) {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, children, node);
  }

  render() {
    return null;
  }
}

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  Portal.propTypes = {
    node: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired,
  };
}

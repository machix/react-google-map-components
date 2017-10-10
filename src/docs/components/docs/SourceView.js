import "prismjs/components/prism-jsx";
// eslint-disable-next-line import/no-extraneous-dependencies
import "prism-themes/themes/prism-vs.css";
import React from "react";
import Prism from "prismjs";
import PropTypes from "prop-types";

export default class SourceView extends React.Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.source !== nextProps.source;
  }

  render() {
    return (
      <pre
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(this.props.source, Prism.languages.jsx),
        }}
      />
    );
  }
}

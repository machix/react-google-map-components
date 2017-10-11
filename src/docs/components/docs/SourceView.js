import "prismjs";
import "prismjs/components/prism-jsx";
import "prism-themes/themes/prism-vs.css";
import React from "react";
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
          // eslint-disable-next-line no-undef
          __html: Prism.highlight(this.props.source, Prism.languages.jsx),
        }}
      />
    );
  }
}

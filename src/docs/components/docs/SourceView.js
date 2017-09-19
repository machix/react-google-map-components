import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/styles";

SourceView.propTypes = {
  language: PropTypes.string,
  source: PropTypes.string.isRequired,
};

SourceView.defaultProps = {
  language: "javascript",
};

export default function SourceView({ source, ...props }) {
  return (
    <SyntaxHighlighter {...props} style={github}>
      {source}
    </SyntaxHighlighter>
  );
}

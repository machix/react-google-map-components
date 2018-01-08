import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import SourceView from "./SourceView";

const renderers = {
  code: x => <SourceView source={x.value} language={x.language} />,
  blockQuote: x => <blockquote className="blockquote">{x.children}</blockquote>,
};

MarkdownView.propTypes = {
  source: PropTypes.string.isRequired,
};

export default function MarkdownView(props) {
  return <ReactMarkdown {...props} renderers={renderers} />;
}

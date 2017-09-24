import React from "react";
import DocSection from "../../docs/DocSection";
import { wrapSection } from "../../../hocs/WrapSection";

const enhancer = wrapSection(
  require.context("./examples", false, /.js$/),
  require.context("!!raw-loader!./examples", false, /.js$/),
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("!!react-docgen-loader!../../../../modules/controls/ScaleControl"),
);

function ScaleControlSection(props) {
  return <DocSection {...props} name="<ScaleControl />" />;
}

export default enhancer(ScaleControlSection);

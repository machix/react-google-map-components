import React from "react";
import DocSection from "../../docs/DocSection";
import { wrapSection } from "../../../hocs/WrapSection";

const enhancer = wrapSection(
  require.context("./examples", false, /.js$/),
  require.context("!!raw-loader!./examples", false, /.js$/),
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("!!react-docgen-loader!../../../../modules/custom-control/CustomControl"),
);

function CustomControlSection(props) {
  return <DocSection {...props} name="<CustomControl />" />;
}

export default enhancer(CustomControlSection);

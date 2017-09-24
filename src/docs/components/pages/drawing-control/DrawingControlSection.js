import React from "react";
import DocSection from "../../docs/DocSection";
import { wrapSection } from "../../../hocs/WrapSection";

const enhancer = wrapSection(
  require.context("./examples", false, /.js$/),
  require.context("!!raw-loader!./examples", false, /.js$/),
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("!!react-docgen-loader!../../../../modules/drawing-control/DrawingControl"),
);

function DrawingControlSection(props) {
  return <DocSection {...props} name="<DrawingControl />" />;
}

export default enhancer(DrawingControlSection);

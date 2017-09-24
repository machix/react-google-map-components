import React from "react";
import DocSection from "../../docs/DocSection";
import { wrapSection } from "../../../hocs/WrapSection";

const enhancer = wrapSection(
  require.context("./examples", false, /.js$/),
  require.context("!!raw-loader!./examples", false, /.js$/),
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("!!react-docgen-loader!../../../../modules/animations/PanTo"),
);

function PanToSection(props) {
  return <DocSection {...props} name="<PanTo />" />;
}

export default enhancer(PanToSection);

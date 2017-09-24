import React from "react";
import DocSection from "../../docs/DocSection";
import { wrapSection } from "../../../hocs/WrapSection";

const enhancer = wrapSection(
  require.context("./examples", false, /.js$/),
  require.context("!!raw-loader!./examples", false, /.js$/),
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("!!react-docgen-loader!../../../../modules/polyline/Polyline"),
);

function PolylineSection(props) {
  return <DocSection {...props} name="<Polyline />" />;
}

export default enhancer(PolylineSection);

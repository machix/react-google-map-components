import React from "react";
import PropTypes from "prop-types";
import DocPage from "../../docs/DocPage";
import DocSection from "../../docs/DocSection";
import { wrapSection } from "../../../hocs/WrapSection";

const enhancer = wrapSection(
  require.context("./examples", false, /.js$/),
  require.context("!!raw-loader!./examples", false, /.js$/),
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("!!react-docgen-loader!../../../../modules/marker/Marker"),
);

MarkerSection.propTypes = {
  docs: PropTypes.object,
  pages: PropTypes.array,
  description: PropTypes.string,
};

function MarkerSection(props) {
  return (
    <DocSection
      name="<Marker />"
      propsDocs={props.docs}
      description={props.description}
    >
      {props.pages.map(x => (
        <DocPage
          key={x.filePath}
          name={x.pageName}
          source={x.source}
          filePath={x.filePath}
          component={x.component}
        />
      ))}
    </DocSection>
  );
}

export default enhancer(MarkerSection);

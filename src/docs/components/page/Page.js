import PropTypes from "prop-types";
import React from "react";

Page.propTypes = { children: PropTypes.node };

export default function Page(props) {
  return (
    <main className="col-sm-9 ml-sm-auto col-md-10 pt-3">{props.children}</main>
  );
}

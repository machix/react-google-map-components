import React from "react";
import PropTypes from "prop-types";

Page.propTypes = { children: PropTypes.node };

export default function Page(props) {
  return (
    <main className="col-sm-9 ml-sm-auto col-md-10 pt-3">{props.children}</main>
  );
}

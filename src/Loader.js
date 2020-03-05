import React from "react";
import { findByLabelText } from "@testing-library/dom";

export default () => (
  <div
    style={{
      display: findByLabelText,
      justifyContent: "center",
      margin: ".5rem"
    }}
  >
    <div className="lds-dual-ring"></div>
  </div>
);

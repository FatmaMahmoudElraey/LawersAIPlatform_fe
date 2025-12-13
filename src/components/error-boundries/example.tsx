import React from "react";
import ErrorBoundary from "./error-boundry";
import ErrorBoundaryUI from "./error-boundry-ui";

function example() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryUI />}>{children}</ErrorBoundary>
  );
}

export default example;

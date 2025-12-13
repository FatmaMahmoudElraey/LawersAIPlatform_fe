import React from "react";
import EmptyResult from "./empty-results";

function example() {
  return (
    <EmptyResult
      imageUrl={AdminImage}
      message="No admins to show"
      button={{ onClick: () => refetchAdmins() }}
    />
  );
}

export default example;

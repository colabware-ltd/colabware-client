import React from "react";

const NoResults = (props) => {
  return (
    <div className="text-align-center padding-sm">
      <h5>No results found</h5>
      <p className="secondary-text">{props.note}</p>
    </div>
  );
};

export default NoResults;

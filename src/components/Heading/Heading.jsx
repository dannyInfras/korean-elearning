import React from "react";

const Heading = (props) => {
  const { type, text } = props;

  let className = "";
  if (type === "h1") {
    className = "text-xlg text-center font-semibold";
  } else if (type === "subtitle") {
    className = "text-white text-md text-center font-medium";
  }

  return <p className={className}>{text}</p>;
};

export default Heading;

import React from "react";
import "HighlightMenu.css";
const HighlightMenu = (props) => {
  return <div className="styled-component">{props.children}</div>;
};
export default HighlightMenu;

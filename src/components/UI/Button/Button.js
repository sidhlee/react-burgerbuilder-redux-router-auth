import React from "react";
import classes from "./Button.module.css";

const button = props => (
  <button
    type="submit"
    disabled={props.disabled}
    className={[
      classes.Button,
      classes[props.btnType]
    ].join(" ")} // className takes string!!
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;

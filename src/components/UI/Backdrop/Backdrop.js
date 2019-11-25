import React from "react";
import classes from "./Backdrop.module.css";

// shows backdrop when props.show: true
// binds passed click handler
const backdrop = props =>
  props.show ? (
    <div
      className={classes.Backdrop}
      onClick={props.clicked}
    ></div>
  ) : null;

export default backdrop;

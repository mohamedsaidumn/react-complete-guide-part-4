import React, { SyntheticEvent } from "react";
import classes from "./Input.module.css";

interface InputProps {
  id: string;
  label: string;
  type: string;
  isValid: boolean;
  value: string;
  onChange: (event: SyntheticEvent) => void;
  onBlur: () => void;
}

const Input = (props: InputProps) => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;

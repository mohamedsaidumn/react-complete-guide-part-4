import React, { SyntheticEvent, useRef, useImperativeHandle, Ref } from "react";
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

interface RefObject {
  focus: () => void;
}

const Input = React.forwardRef((props: InputProps, ref: Ref<RefObject>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const activate = () => {
    inputRef.current?.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;

import React, {
  useState,
  SyntheticEvent,
  FormEvent,
  useEffect,
  useReducer,
  useContext,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext, { AuthContextType } from "../../store/auth-context";
import Input from "../UI/Input/Input";

interface stateInterface {
  value: string;
  isValid: boolean;
}

interface actionInterface {
  type: string;
  val?: string;
}

const emailReducer = (state: stateInterface, action: actionInterface) => {
  switch (action.type) {
    case "USER_INPUT":
      if (action.val)
        return { value: action.val, isValid: action.val.includes("@") };
      else {
        return { value: "", isValid: false };
      }
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state: stateInterface, action: actionInterface) => {
  switch (action.type) {
    case "USER_PASSWORD":
      if (action.val)
        return { value: action.val, isValid: action.val.length > 6 };
      else {
        return { value: "", isValid: false };
      }
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.length > 6 };
    default:
      return { value: "", isValid: false };
  }
};

interface LoginProps {}

const Login = (props: LoginProps) => {
  const ctx: AuthContextType = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    {
      value: "",
      isValid: false,
    },
    undefined
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    {
      value: "",
      isValid: false,
    },
    undefined
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    dispatchEmail({ type: "USER_INPUT", val: target.value });
  };

  const passwordChangeHandler = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    dispatchPassword({ type: "USER_PASSWORD", val: target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

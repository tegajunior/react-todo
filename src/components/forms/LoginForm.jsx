import React, { useState, useRef } from "react";
import classes from "./Forms.module.css";


const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonRef = useRef()

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    buttonRef.current.disabled = true;

    const data = {
      email: email,
      password: password,
    };
    props.onSubmitLoginForm(data);
    buttonRef.current.disabled = false;
  };
  return (
    <div className={classes.root}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.formControl}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChangeHandler}
            required
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChangeHandler}
            required
          />
        </div>
        <div className={classes.buttonContainer}>
          <button type="submit" className={classes.button} ref={buttonRef}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

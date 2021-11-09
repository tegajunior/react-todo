import React from "react";
import useInput from "../../hooks/use-input";
import classes from "./Forms.module.css";

const RegisterForm = (props) => {
  const {
    value: enteredFullName,
    hasError: enteredFullNameHasError,
    isValid: enteredFullNameIsValid,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    
  } = useInput((value) => value.trim().length >= 3);

  const {
    value: enteredEmail,
    hasError: enteredEmailHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    (value) => value.trim().includes("@") && value.trim().length >= 5
  );

  const {
    value: enteredPassword,
    hasError: enteredPasswordHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length >= 5);

  const {
    value: enteredConfirmPassword,
    hasError: enteredConfirmPasswordHasError,
    isValid: enteredConfirmPasswordIsValid,
    valueChangeHandler: confirmPpasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() === enteredPassword);


  let formIsValid = false;

  if (
    enteredFullNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  )
    formIsValid = true;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!enteredFullNameIsValid || !enteredEmailIsValid || !enteredPasswordIsValid || !enteredConfirmPassword ) return;
    const payload = {
      fullname: enteredFullName,
      email: enteredEmail,
      password: enteredPassword
    };
    props.onSubmitRegisterForm(payload);
    
    resetPasswordInput();
    resetConfirmPasswordInput();
  };
  const fullNameInputClasses = `${classes.formControl} ${
    enteredFullNameHasError ? classes.invalid : ""
  }`;
  const emailInputClasses = `${classes.formControl} ${
    enteredEmailHasError ? classes.invalid : ""
  }`;

  const passwordInputClasses = `${classes.formControl} ${
    enteredPasswordHasError ? classes.invalid : ""
  }`;

  const confirmPasswordInputClasses = `${classes.formControl} ${
    enteredConfirmPasswordHasError ? classes.invalid : ""
  }`;

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmitHandler}>
        <div className={fullNameInputClasses}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            onChange={fullNameChangeHandler}
            onBlur={fullNameBlurHandler}
            value={enteredFullName}
          />
          {enteredFullNameHasError && (
            <p className={classes.errorText}>
              Full name must be at least 3 chars long.
            </p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {enteredEmailHasError && (
            <p className={classes.errorText}>Please enter a valid email.</p>
          )}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {enteredPasswordHasError && (
            <p className={classes.errorText}>
              Password must be at least 5 chars long.{" "}
            </p>
          )}
        </div>
        <div className={confirmPasswordInputClasses}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={enteredConfirmPassword}
            onChange={confirmPpasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          {enteredConfirmPasswordHasError && (
            <p className={classes.errorText}>Passwords does not match.</p>
          )}
        </div>
        <div className={classes.buttonContainer}>
          <button
            type="submit"
            className={classes.button}
            disabled={!formIsValid}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

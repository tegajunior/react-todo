import React, { useState, useContext } from "react";
import classes from "./Home.module.css";
import { useHistory } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import {loginCall, registerCall} from '../../apiCalls.js';

import RegisterForm from "../../components/forms/RegisterForm";
import LoginForm from "../../components/forms/LoginForm";

const Home = () => {
  const [currentForm, setCurrentForm] = useState("register");
  const { isFetching, dispatch } = useContext(AuthContext);

  const history = useHistory();

  const onSubmitLoginFormHandler = (data)=> {
    loginCall(data, dispatch, history)
  }

  const onSubmitRegisterFormHandler = (data)=> {
    registerCall(data, setCurrentForm)
  }

  const showRegisterForm = () => {
    setCurrentForm("register");
  }

  const showLoginForm = () => {
    setCurrentForm("login");
  }
  const registerFormClasses = `${classes.navigationItem} ${
    currentForm === "register"
      ? classes.current
      : ''
  }`;

  const loginFormClasses = `${classes.navigationItem} ${
    currentForm === "login" ? classes.current : ""
  }`;
  return (
    <div className={classes.root}>
      <div className={classes.navigation}>
        <div className={loginFormClasses} onClick={showLoginForm}>
          <span className={classes.navLink}>Sign In</span>
        </div>
        <div className={registerFormClasses} onClick={showRegisterForm}>
          <span className={classes.navLink}>Sign Up</span>
        </div>
      </div>
      {currentForm === "register" ? (
        <RegisterForm onSubmitRegisterForm={onSubmitRegisterFormHandler} />
      ) : currentForm === "login" ? (
        <LoginForm onSubmitLoginForm={onSubmitLoginFormHandler} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

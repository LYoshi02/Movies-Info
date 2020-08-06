import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import AuthForm from "../../components/Auth/AuthForm/AuthForm";

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
    },
  },
}));

const Auth = (props) => {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authInputs, setAuthInputs] = useState({
    username: {
      elementType: "auth-input",
      elementConfig:{
        label:"Nombre de Usuario",
        type: "text",
        required: true
      },
      value: "",
      error: {
        isError: false,
        label: "Error",
        info: "Se ha producido un error"
      },
      // validation: {
      //   minLength: 5
      // },
      // touched: false,
      // valid: false
    },
    password: {
      elementType: "auth-password-input",
      elementConfig:{
        label:"Contrasena",
        type: "password",
        required: true
      },
      value: "",
      error: {
        isError: false,
        label: "Error",
        info: "Se ha producido un error"
      }
    },
    // password: {
    //   value: "",
    //   error: null
    // },
    // email: {
    //   value: "",
    //   error: null
    // }
  })

  const { pathname } = props.location;
  useEffect(() => {
    console.log("change");
    setIsSignIn(pathname === "/signin");
  }, [pathname]);

  const toggleInputHandler = (inputId) => {
    if(inputId === "password") {
      passwordVisibilityHandler();
      // This is not working
      setAuthInputs({
        ...authInputs,
        password: {
          ...authInputs.password,
          elementConfig:{
            ...authInputs.password.elementConfig,
            type: showPassword ? "text" : "password"
          }
        }
      })
    }
  }

  const passwordVisibilityHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const inputValueHandler = (event, inputId) => {
    setAuthInputs({
      ...authInputs,
      [inputId]: {
        ...authInputs[inputId],
        value: event.target.value.trim()
      }
    })
  }

  return (
    <div className={classes.containerStyles}>
      <AuthForm
        isSignIn={isSignIn}
        showPassword={showPassword}
        togglePasswordVisibility={passwordVisibilityHandler}
        inputs={authInputs}
        changeInputValue={inputValueHandler}
        toggleInput={toggleInputHandler}
      />
    </div>
  );
};

export default Auth;

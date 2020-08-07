import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import axios from "axios";

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
  const [authInputs, setAuthInputs] = useState({
    email: {
      elementType: "auth-input",
      elementConfig:{
        label:"Email",
        type: "email",
        required: true
      },
      value: "test@test.com",
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
      // TODO LATER
    },
    password: {
      elementType: "auth-password-input",
      elementConfig:{
        label:"Contrasena",
        type: "password",
        required: true
      },
      value: "123456",
      error: {
        isError: false,
        label: "Error",
        info: "Se ha producido un error"
      }
    },
    username: {
      elementType: "auth-input",
      elementConfig:{
        label:"Nombre de Usuario",
        type: "text",
        required: true
      },
      value: "MyUsername",
      error: {
        isError: false,
        label: "Error",
        info: "Se ha producido un error"
      },
    },
  })

  const { pathname } = props.location;
  useEffect(() => {
    console.log("change");
    setIsSignIn(pathname === "/signin");
  }, [pathname]);

  const toggleInputHandler = (inputId) => {
    if(inputId === "password") {
      setAuthInputs({
        ...authInputs,
        password: {
          ...authInputs.password,
          elementConfig:{
            ...authInputs.password.elementConfig,
            type: authInputs.password.elementConfig.type === "password" ? "text" : "password"
          }
        }
      });
    }
  }

  const inputValueHandler = (event, inputId) => {
    setAuthInputs({
      ...authInputs,
      [inputId]: {
        ...authInputs[inputId],
        value: event.target.value.trim()
      }
    })
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log("Formulario enviado.");
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxKAMCrPe4V49zFR74oZBQCXQepERUXO8";
    const newUser = {
      email: authInputs.email.value,
      password: authInputs.password.value,
      returnSecureToken: true
    }
    if(isSignIn) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxKAMCrPe4V49zFR74oZBQCXQepERUXO8";
    }

    axios.post(url, newUser)
    .then(res => {
      console.log(res);
      // res.data.localId
      const userData = {
        [res.data.localId]: {
          username: authInputs.username.value
        }
      }
      axios.put("https://movies-info-f83aa.firebaseio.com/users.json", userData)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  const formInputs = [];
  for(let key in authInputs) {
    formInputs.push({...authInputs[key], id: key});
  }
  if(isSignIn) {
    const usernameIndex = formInputs.findIndex(input => input.id === "username");
    formInputs.splice(usernameIndex, 1);
  }

  return (
    <div className={classes.containerStyles}>
      <AuthForm
        isSignIn={isSignIn}
        inputs={formInputs}
        changeInputValue={inputValueHandler}
        toggleInput={toggleInputHandler}
        submitForm={submitFormHandler}
      />
    </div>
  );
};

export default Auth;

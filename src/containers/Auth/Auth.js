import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Box } from "@material-ui/core";

import { updateObject, checkValidity } from "../../shared/utility";
import AuthForm from "../../components/Auth/AuthForm/AuthForm";

const Auth = (props) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [authInputs, setAuthInputs] = useState({
    email: {
      elementType: "auth-input",
      elementConfig:{
        label:"Email",
        type: "email",
        required: true
      },
      value: "",
      error: {
        isError: false,
        label: "Error",
        message: ""
      },
      validation: {
        required: true,
        isEmail: true
      },
      valid: false
    },
    password: {
      elementType: "auth-password-input",
      elementConfig:{
        label:"Contraseña",
        type: "password",
        required: true
      },
      value: "",
      error: {
        isError: false,
        label: "Error",
        message: ""
      },
      validation: {
        minLength: 8
      },
      valid: false
    },
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
        message: ""
      },
      validation: {
        unique: true,
        minLength: 4,
        required: true
      },
      valid: false
    },
  })

  const { pathname, search } = props.location;
  const { onSetAuthRedirectPath } = props;
  useEffect(() => {
    let redirectPath = "/";
    const urlParams = new URLSearchParams(search);
    const movieId = urlParams.get("movieId")
    if(movieId) {
      redirectPath = `/pelicula/reviews/${movieId}`;
    }
    onSetAuthRedirectPath(redirectPath);
  }, [search, onSetAuthRedirectPath]);

  useEffect(() => {
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
    const inputMessage = checkValidity(event.target.value, authInputs[inputId].validation);
    const inputErrors = updateObject(authInputs[inputId].error, {
      isError: inputMessage !== "success",
      message: (inputMessage !== "success") ? inputMessage : ""
    });

    const updatedInputs = updateObject(authInputs, {
      [inputId]: {
        ...authInputs[inputId],
        value: event.target.value,
        valid: inputMessage === "success",
        error: {...inputErrors}
      }
    });

    let validForm = true;
    for(let inputName in updatedInputs) {
      validForm = updatedInputs[inputName].valid && validForm;
    }
    
    setFormIsValid(validForm);
    setAuthInputs(updatedInputs);
  }

  const checkUniqueUsername = async () => {
    let isUnique = false;
    const lowercaseUsername = authInputs.username.value.toLowerCase();
    await axios.get(`https://movies-info-f83aa.firebaseio.com/usernames/${lowercaseUsername}.json`)
    .then(res => {
      console.log(res);
      isUnique = res.data === null;
    });

    if(!isUnique) {
      setInputError("username", "Este usuario ya está ocupado");
    }
    return isUnique;
  }

  const setInputError = (inputId, errorMessage) => {
    const inputErrors = updateObject(authInputs[inputId].error, {
      isError: true,
      message: errorMessage
    });
    const updatedInputs = updateObject(authInputs, {
      [inputId]: {
        ...authInputs[inputId],
        error: {...inputErrors}
      }
    });
    setAuthInputs(updatedInputs);
  }

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if(isSignIn || (await checkUniqueUsername() && formIsValid)) {
      const formData = {
        email: authInputs.email.value,
        password: authInputs.password.value,
        username: authInputs.username.value
      }
      props.onAuth(formData, isSignIn);
    }
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
    <Box p={{xs: "0 1rem"}}>
      <AuthForm
        isSignIn={isSignIn}
        inputs={formInputs}
        changeInputValue={inputValueHandler}
        toggleInput={toggleInputHandler}
        submitForm={submitFormHandler}
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (formData, isSignIn) => dispatch(actions.auth(formData, isSignIn)),
    onSetAuthRedirectPath: (redirectPath) => dispatch(actions.setAuthRedirectPath(redirectPath))
  }
}

export default connect(null, mapDispatchToProps)(Auth);
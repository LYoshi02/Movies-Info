import React, { useState, useEffect } from "react";
import axios from "axios";
import * as actions from "../../store/actions/index";
import { makeStyles } from "@material-ui/core";

import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import { connect } from "react-redux";

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
        value: event.target.value
      }
    })
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    const formData = {
      email: authInputs.email.value,
      password: authInputs.password.value,
      username: authInputs.username.value
    }
    props.onAuth(formData, isSignIn);

    /*axios.post(url, newUser)
    .then(res => {
      // To have the user's name when he signs in
      const username = authInputs.username.value.trim();
      const userId = res.data.localId;
      const userData = {
        username,
        // userImg: imgUrl (In the future maybe)
      }
      const usernamesData = {
        userId
      }

      axios.all([
        axios.put(`https://movies-info-f83aa.firebaseio.com/users/${userId}.json`, userData),
        axios.put(`https://movies-info-f83aa.firebaseio.com/usernames/${username}.json`, usernamesData)
      ])
      .then(
        axios.spread((usersRes, usernamesRes) => {
          console.log(usersRes, usernamesRes);
        })
      )
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })*/
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (formData, isSignIn) => dispatch(actions.auth(formData, isSignIn)) 
  }
}

export default connect(null, mapDispatchToProps)(Auth);

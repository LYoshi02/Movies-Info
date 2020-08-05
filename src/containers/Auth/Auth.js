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
  
  const { pathname } = props.location;
  useEffect(() => {
      console.log("change")
      setIsSignIn(pathname === "/signin");
  }, [pathname]);

  const passwordVisibilityHandler = (event) => {
    event.preventDefault();
    // TODO: change this line to use prevState instead
    setShowPassword(!showPassword);
  }

  return (
    <div className={classes.containerStyles}>
      <AuthForm isSignIn={isSignIn} showPassword={showPassword} togglePasswordVisibility={passwordVisibilityHandler} />
    </div>
  );
};

export default Auth;

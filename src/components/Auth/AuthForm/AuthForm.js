import React from "react";
import { makeStyles, Box, Button, Typography } from "@material-ui/core";

import Heading from "../../UI/Heading/Heading";
import Input from "../../UI/Input/Input";
import SocialMedias from "../SocialMedias/SocialMedias";

const useStyles = makeStyles((theme) => ({
  formStyles: {
    backgroundColor: "rgba(255,255,255,.95)",
    padding: "5rem 8rem",
    width: "55rem",
    margin: "5rem auto",
    borderRadius: "5px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "5rem 2rem",
    },
  },
  formButtonStyles: {
    padding: "2rem 1rem",
  },
  typographyStyles: {
    marginBottom: "2rem",
  },
}));

const AuthForm = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.formStyles} onSubmit={props.submitForm}>
      <Box textAlign="center">
        <Heading
          type="form"
          title={props.isSignIn ? "Iniciar Sesión" : "Crear Cuenta"}
          subtitle={props.isSignIn ? "¿Sos nuevo?" : "¿Ya tenés tu cuenta?"}
          special={props.isSignIn ? "Registrate acá" : "Ingresá acá"}
          path={props.isSignIn ? "/signup" : "/signin"}
        />
      </Box>

      <Box m="2.5rem 0 5rem 0">
        {
          props.inputs.map(input => (
            <Input
              key={input.id}
              type={input.elementType}
              inputConfig={input.elementConfig}
              error={input.error}
              changed={(event) => props.changeInputValue(event, input.id)}
              value={input.value}
              toggle={() => props.toggleInput(input.id)}
            />
          ))
        }
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          fullWidth
          className={classes.formButtonStyles}
          type="submit"
        >
          {props.isSignIn ? "Iniciar Sesión" : "Crear Cuenta"}
        </Button>
      </Box>

      <Box textAlign="center">
        <Typography className={classes.typographyStyles}>
          o continuar con
        </Typography>
        <SocialMedias />
      </Box>
    </form>
  );
};

export default AuthForm;

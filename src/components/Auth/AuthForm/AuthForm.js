import React from "react";
import { makeStyles, Box, Button, Typography, InputAdornment, Input, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Heading from "../../UI/Heading/Heading";
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
  inputStyles: {
    marginBottom: "3rem",
    "& > *": {
      color: "#000",
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
    <form className={classes.formStyles}>
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
        <Input
          placeholder="Nombre de Usuario"
          fullWidth
          color="secondary"
          className={classes.inputStyles}
          classes={{ root: classes.inputStyles }}
        />
        <Input
          placeholder="Contraseña"
          fullWidth
          color="secondary"
          classes={{ root: classes.inputStyles }}
          type={props.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
              aria-label="toggle password visibility"
              onClick={props.togglePasswordVisibility}
              >
                {props.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          fullWidth
          className={classes.formButtonStyles}
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

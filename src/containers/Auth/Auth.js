import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Box, Button, Typography } from "@material-ui/core";
import Heading from "../../components/UI/Heading/Heading";

import googleIcon from "../../assets/google_icon.png";
import facebookIcon from "../../assets/facebook_icon.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    containerStyles: {
        [theme.breakpoints.down("xs")]: {
            padding: "0 1rem",
        }
    },
    formStyles: {
      backgroundColor: "rgba(255,255,255,.95)",
      padding: "5rem 3rem",
      width: "55rem",
      margin: "5rem auto",
      borderRadius: "5px",
      [theme.breakpoints.down("xs")]: {
          width: "100%",
          padding: "5rem 2rem",
      }
    },
    headingBoxStyles: {
      textAlign: "center",
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
    imageStyles: {
      width: "2.5rem",
      height: "2.5rem",
      display: "inline-block",
    },
    imageContainerStyles: {
      marginRight: "2rem",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      border: "2px solid #bdbdbd",
      width: "6rem",
      height: "6rem",
      transition: ".3s all",
      cursor: "pointer",
      "&:hover": {
          border: "2px solid #616161",
      },
    },
    otherBoxStyles: {
        textAlign: "center"
    },
    typographyStyles: {
        marginBottom: "2rem"
    }
  }));

const Auth = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.containerStyles}>
      <form className={classes.formStyles}>
        <Box className={classes.headingBoxStyles}>
          <Heading type="secondary" color="textSecondary">
            Iniciar Sesion
            <Typography>
                Sos nuevo? <Typography component="span" color="secondary">Registrate aca</Typography>
            </Typography>
          </Heading>
        </Box>

        <Box m="2rem 0">
          <TextField
            placeholder="Nombre de Usuario"
            fullWidth
            color="secondary"
            className={classes.inputStyles}
            classes={{ root: classes.inputStyles }}
          />
          <TextField
            placeholder="Contrasena"
            fullWidth
            color="secondary"
            classes={{ root: classes.inputStyles }}
          />
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            fullWidth
            className={classes.formButtonStyles}
          >
            Iniciar Sesion
          </Button>
        </Box>

        <Box className={classes.otherBoxStyles}>
          <Typography className={classes.typographyStyles}>o continuar con</Typography>
          <Box>
            <div className={classes.imageContainerStyles}>
                <img src={facebookIcon} className={classes.imageStyles} alt="facebook icon" />
            </div>

            <div className={classes.imageContainerStyles}>
                <img src={googleIcon} className={classes.imageStyles} alt="google icon" />
            </div>

            <div className={classes.imageContainerStyles}>
                <img src={facebookIcon} className={classes.imageStyles} alt="twitter icon" />
            </div>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Auth;

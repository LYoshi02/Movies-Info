import React from "react";
import { Box, Button, createMuiTheme } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";

import Detail from "../../UI/Detail/Detail";
import UserImg from "../UserImg/UserImg";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  infoStyles: {
    display: "grid",
    gridTemplateColumns: "min-content 1fr",
    gridColumnGap: "4rem",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "repeat(2, min-content)",
      gridRowGap: "2rem",
    },
  },
  detailsStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      alignItems: "stretch"
    }
  }
}));

const redTheme = createMuiTheme({
  palette: { primary: red },
  typography: {
    htmlFontSize: 10,
  },
});

const UserInfo = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.infoStyles}>
      <UserImg changed={props.uploadImage} imgUrl={props.userImgUrl} />

      <Box className={classes.detailsStyles}>
        <Box mb={{xs: "2rem"}}>
          <Detail name="username" color="textSecondary">
            {props.username}
          </Detail>
          <Detail name="fecha de registro" color="textSecondary">
            {props.signupDate}
          </Detail>
        </Box>
        <ThemeProvider theme={redTheme}>
          <Button
            variant="contained"
            onClick={props.logout}
            color="primary"
          >
            Cerrar Sesión
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default UserInfo;

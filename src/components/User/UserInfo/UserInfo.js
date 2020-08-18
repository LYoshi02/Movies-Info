import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Detail from "../../UI/Detail/Detail";

import UserImg from "../UserImg/UserImg";

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
}));

const UserInfo = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.infoStyles}>
      <UserImg changed={props.uploadImage} imgUrl={props.userImgUrl} />

      <Box>
        <Detail name="username" color="textSecondary">
          Yoshi Debat
        </Detail>
        <Detail name="fecha de registro" color="textSecondary">
          17 de octubre 2020
        </Detail>
        <Detail name="reviews hechas" color="textSecondary">
          10
        </Detail>
        <Button variant="contained" onClick={props.logout}>Cerrar Sesión</Button>
      </Box>
    </Box>
  );
};

export default UserInfo;

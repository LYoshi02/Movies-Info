import React from "react";
import { Box, Avatar, makeStyles } from "@material-ui/core";

import defaultUserImg from "../../../assets/default-user-image.png";
import AddPhotoAlternateRoundedIcon from "@material-ui/icons/AddPhotoAlternateRounded";

import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  boxStyles: {
    [theme.breakpoints.down("xs")]: {
      justifySelf: "center",
    },
    position: "relative",
    cursor: "pointer"
  },
  avatarStyles: {
    height: "15rem",
    width: "15rem",
  },
  iconStyles: {
    borderRadius: "50%",
    backgroundColor: indigo[500],
    color: "#eee",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: ".5rem",
    height: "4rem",
    width: "4rem",
  },
}));

const UserImg = (props) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.boxStyles}
      onChange={props.changed}
      component="label"
    >
      <Avatar src={props.imgUrl ? props.imgUrl : defaultUserImg} className={classes.avatarStyles} />
      <Box className={classes.iconStyles}>
        <AddPhotoAlternateRoundedIcon />
      </Box>
      <input type="file" style={{ display: "none" }} />
    </Box>
  );
};

export default UserImg;

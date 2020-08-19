import React from "react";
import * as actions from "../../store/actions/index";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Heading from "../../components/UI/Heading/Heading";
import UserInfo from "../../components/User/UserInfo/UserInfo";
import { connect } from "react-redux";

const useStyles = makeStyles({
  boxStyles: {
    backgroundColor: "#eee",
    padding: "4rem 2rem",
    margin: "2rem",
    borderRadius: "5px",
  },
});

const User = (props) => {
  const classes = useStyles();

  const { userId, username, signupDate } = props;
  const checkFile = (event) => {
    const userImage = event.target.files[0];
    if (
      userImage &&
      (userImage.type === "image/jpeg" || userImage.type === "image/png") &&
      userImage.size < 5000000
    ) {
      console.log(event.target.files[0]);
      const userData = {
        username,
        signupDate
      }
      props.onUploadImage(userData, userImage, userId);
    } else {
      console.log("error al subir");
    }
  };

  return (
    <Box className={classes.boxStyles}>
      <Heading type="secondary" align="center">
        Tu Perfil
      </Heading>

      <UserInfo
        uploadImage={checkFile}
        username={props.username}
        signupDate={props.signupDate}
        userImgUrl={props.userImgUrl}
        logout={props.onLogout}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    userImgUrl: state.auth.userImgUrl,
    signupDate: state.auth.signupDate,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadImage: (userData, userImage, userId) => dispatch(actions.uploadImage(userData, userImage, userId)),
    onLogout: () => dispatch(actions.authLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

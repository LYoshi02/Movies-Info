import React, { useEffect } from "react";
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

  const { onFetchUserInfo, userId } = props;
  useEffect(() => {
    onFetchUserInfo(userId);
  }, [onFetchUserInfo, userId]);

  const checkFile = (event) => {
    const userImage = event.target.files[0];
    if (
      userImage &&
      (userImage.type === "image/jpeg" || userImage.type === "image/png") &&
      userImage.size < 5000000
    ) {
      console.log(event.target.files[0]);
      props.onUploadImage(userImage, props.userId, props.username, props.signupDate);
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
    username: state.user.username,
    userImgUrl: state.user.imgUrl,
    signupDate: state.user.signupDate,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadImage: (userImage, userId, username, signupDate) =>
      dispatch(actions.uploadImage(userImage, userId, username, signupDate)),
    onLogout: () => dispatch(actions.authLogout()),
    onFetchUserInfo: (userId) => dispatch(actions.fetchUserInfo(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

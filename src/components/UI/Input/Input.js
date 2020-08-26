import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  Input,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  authInputStyles: {
    marginBottom: "3rem",
    "& input": {
      color: grey[900],
    },
    "& label": {
      color: grey[600],
    },
  },
});

const CustomInput = (props) => {
  const classes = useStyles();
  let inputElement;

  switch (props.type) {
    case "auth-input":
      inputElement = (
        <FormControl
          fullWidth
          color="secondary"
          error={props.error.isError}
          classes={{ root: classes.authInputStyles }}
        >
          <InputLabel>
            {props.error.isError ? props.error.label : props.inputConfig.label}
          </InputLabel>
          <Input
            onChange={props.changed}
            value={props.value}
            {...props.inputConfig}
          />
          <FormHelperText>
            {props.error.isError ? props.error.message : null}
          </FormHelperText>
        </FormControl>
      );
      break;
      case "auth-password-input":
          inputElement = (
            <FormControl
            fullWidth
            color="secondary"
            error={props.error.isError}
            classes={{ root: classes.authInputStyles }}
          >
            <InputLabel>
              {props.error.isError ? props.error.label : props.inputConfig.label}
            </InputLabel>
            <Input
              onChange={props.changed}
              value={props.value}
              {...props.inputConfig}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={props.toggle}
                  >
                    {props.inputConfig.type === "text" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              {props.error.isError ? props.error.message : null}
            </FormHelperText>
          </FormControl>
          );
      break;
      default: return null;
  }

  return inputElement;
};

export default CustomInput;

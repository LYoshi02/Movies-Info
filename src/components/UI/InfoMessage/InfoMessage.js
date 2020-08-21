import React from 'react';
import {
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
    paperStyles: {
      padding: "2rem",
      textAlign: "center",
    },
  });

const InfoMessage = (props) => {
    const classes = useStyles();

    let message = null;
    switch(props.status) {
        case "not-found": 
            message = (
                <Paper className={classes.paperStyles}>
                    <Typography color="textSecondary">
                        {props.message}
                    </Typography>
                </Paper>
            );
            break;
        case "error":
            message = (
                <Alert severity="error">
                    {props.message}
                </Alert>
            );
            break;
        default: return null;
    }

    return message;
}
 
export default InfoMessage;
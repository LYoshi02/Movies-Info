import React from 'react';
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
    return (  
        <Snackbar open={props.open} autoHideDuration={5000} onClose={props.close} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <MuiAlert onClose={props.close} severity={props.severity} elevation={6} variant="filled">
            {props.message}
          </MuiAlert>
        </Snackbar>
    );
}
 
export default Alert;
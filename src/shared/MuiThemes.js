import React from 'react'
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import red from '@material-ui/core/colors/red';


const redButtonTheme = createMuiTheme({
  palette: { primary: { main: red[500] } },
  typography: {
    htmlFontSize: 10,
  },
});

export const RedButtonTheme = (props) => (
    <ThemeProvider theme={redButtonTheme}>
        {props.children}
    </ThemeProvider>
);
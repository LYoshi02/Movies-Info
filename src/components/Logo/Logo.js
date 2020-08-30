import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import pageLogo from "../../assets/PageLogo.png";

const useStyles = makeStyles({
    logoStyles: {
        height: "5rem",
        flex: "1"
    },
    logoImageStyles: {
        display: "inline-block",
        height: "5rem"
    }
});

const Logo = props => {
    const classes = useStyles();
    
    return(
        <div className={classes.logoStyles}>
            <Link to="/">
                <img alt="Page Logo" src={pageLogo} className={classes.logoImageStyles} />
            </Link>
        </div>
    );
}

export default Logo;
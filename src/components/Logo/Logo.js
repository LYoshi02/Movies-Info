import React from 'react';
import pageLogo from "../../assets/PageLogo.png";
import { Link } from 'react-router-dom';

import classes from "./Logo.module.css";

const logo = props => (
    <div className={classes.Logo}>
        <Link to="/">
            <img alt="Page Logo" src={pageLogo} />
        </Link>
    </div>
);

export default logo;
import React from 'react';
import classes from './Header.module.scss'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../app/App";

const Header = () => {
    const navigate = useNavigate()
    const onClickHandler = () => navigate(PATH.LOGIN)
    return (
        <div className={classes.header}>
            <div className={classes.innerContent}>
                <div>Cards education game</div>
                <Button variant='contained' className={classes.loginBtn} onClick={onClickHandler}>Log In</Button>
            </div>
        </div>
    );
};

export default Header;
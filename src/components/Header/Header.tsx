import React from 'react';
import classes from './Header.module.scss'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../app/App";
import {useAppSelector} from "../../app/hooks/hooks";
import defaultPhoto from "../../assets/images/defaultUserPhoto.png"


const Header = () => {
    const navigate = useNavigate()
    const {isLoggedIn} = useAppSelector(state => state.login)
    const {avatar} = useAppSelector(state => state.profile)
    const image = avatar ? avatar : defaultPhoto
    const onClickHandler = () => navigate(PATH.LOGIN)
    return (
        <div className={classes.header}>
            <div className={classes.innerContent}>
                <div>Cards education game</div>
                {isLoggedIn
                    ? <img className={classes.ava} src={image} alt="avatar"/>
                    : <Button variant='contained' className={classes.loginBtn} onClick={onClickHandler}>Log In</Button>
                }

            </div>
        </div>
    );
};

export default Header;
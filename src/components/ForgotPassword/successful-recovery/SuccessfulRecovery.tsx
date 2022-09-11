import React from 'react';
import classes from './SuccessfulRecovery.module.scss'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../app/App";
import mail from "../../../assets/images/mailpic.png"
import {useAppSelector} from "../../../app/hooks/hooks";

const SuccessfulRecovery = () => {
    const email = useAppSelector(state => state.forgot.recoveredMail)
    const navigate = useNavigate()
    const onClickHandler = () => navigate(PATH.LOGIN)
    return (
        <div className={classes.mainWrap}>
            <h2 className={classes.title}>Check Email</h2>
            <img className={classes.mailPic} src={mail} alt="email sent"/>
            <span className={classes.explanatoryText}>We've sent an Email with instructions to {email}</span>
            <Button variant='contained' onClick={onClickHandler}>Back to login</Button>
        </div>
    );
};

export default SuccessfulRecovery;
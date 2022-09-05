import React, {useState} from 'react';
import classes from './SuccessfulRecovery.module.css'
import {Button} from "@mui/material";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../app/App";
import mail from "../../../assets/images/mailpic.png"
import {useAppSelector} from "../../../app/hooks/hooks";

const SuccessfulRecovery = () => {
    const email = useAppSelector(state => state.forgot.recoveredMail)
    const [state, setState] = useState(false)
    const onClickHandle = () => setState(!state)
    if (state) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={classes.mainWrap}>
            <h2 className={classes.title}>Check Email</h2>
            <img className={classes.mailPic} src={mail} alt="email sent"/>
            <span className={classes.explanatoryText}>We've sent an Email with instructions to {email}</span>
            <Button variant='contained' onClick={onClickHandle}>Back to login</Button>
        </div>
    );
};

export default SuccessfulRecovery;
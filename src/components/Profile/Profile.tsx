import React, {ChangeEvent, useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import {logout} from "../Login/login-reducer";
import classes from './Profile.module.scss'
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../app/App";
import defaultPhoto from "../../assets/images/defaultUserPhoto.jpg"
import {changeName} from './profile-reducer';
import {Button, TextField} from "@mui/material";

const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const {name, email, avatar} = useAppSelector(state => state.profile)

    const [editMode, setEditMode] = useState(false)
    const [nameField, setNameField] = useState(name)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const image = avatar ? avatar : defaultPhoto

    const logoutHandler = useCallback(() => dispatch(logout()), [])
    const editModeHandler = useCallback(() => {
        setEditMode(!editMode)
        if (nameField !== name && nameField.trim()) {
            dispatch(changeName({name: nameField, avatar: defaultPhoto}))
        }
    }, [editMode, nameField])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNameField(e.currentTarget.value)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={classes.profileWrap}>
            <div className={classes.profileWindow}>
                <h2 className={classes.title}>Personal Information</h2>
                <img className={classes.userAvatar} src={image} alt="user avatar"/>
                <Button variant="contained" onClick={() => navigate(PATH.PACKS)}>packs</Button>
                {!editMode ? <span onDoubleClick={editModeHandler} className={classes.userName}>{name}</span>
                    :
                    <TextField variant='standard' onBlur={editModeHandler} value={nameField} onChange={onChangeHandler}
                               autoFocus/>}
                <span className={classes.userMail}>{email}</span>
                <Button variant='contained' onClick={logoutHandler}>Log out</Button>
            </div>
        </div>
    );
};

export default Profile;
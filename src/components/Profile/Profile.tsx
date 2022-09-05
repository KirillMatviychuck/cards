import React, { ChangeEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { logout } from "../Login/login-reducer";
import classes from './Profile.module.css'
import { Navigate } from "react-router-dom";
import { PATH } from "../../app/App";
import defaultPhoto from "../../assets/images/defaultUserPhoto.png"
import { changeName } from './profile-reducer';

const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const { name, email, avatar } = useAppSelector(state => state.profile)

    const [editMode, setEditMode] = useState(false)
    const [nameField, setNameField] = useState(name)
    const dispatch = useAppDispatch()

    const image = avatar ? avatar : defaultPhoto

    const logoutHandler = useCallback(() => dispatch(logout()), [])
    const editModeHandler = useCallback(() => {
        setEditMode(!editMode)
        if (nameField !== name && nameField.trim()) {
            dispatch(changeName({ name: nameField, avatar: defaultPhoto }))
        }
    }, [editMode, nameField])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNameField(e.currentTarget.value)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />
    }
    return (
        <div className={classes.profileWrap}>
            <div className={classes.profileWindow}>
                <span className={classes.title}>Personal Information</span>
                <img className={classes.userAvatar} src={image} alt="user avatar" />
                {!editMode ? <span onDoubleClick={editModeHandler} className={classes.userName}>{name}</span>
                    : <input onBlur={editModeHandler} value={nameField} onChange={onChangeHandler} type="text" autoFocus />}
                <span className={classes.userMail}>{email}</span>
                <button className={classes.logoutBtn} onClick={logoutHandler}>Log out</button>
            </div>
        </div>
    );
};

export default Profile;
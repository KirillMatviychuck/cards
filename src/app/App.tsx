import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import Packs from "../components/Packs/Packs";
import Cards from "../components/Cards/Cards";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { initializeCheck } from "./app-reducer";
import CustomizedSnackbars from '../common/CustomizedSnackbar/CustomizedSnackbar';
import SuccessfulRecovery from "../components/ForgotPassword/successful-recovery/SuccessfulRecovery";
import Header from "../components/Header/Header";
import SetNewPassword from "../components/SetNewPassword/SetNewPassword";
import Registration from "../components/Registration/Registration";

export enum PATH {
    LOGIN = '/login',
    PROFILE = '/profile',
    PACKS = '/packs',
    CARDS = '/cards',
    FORGOT = '/forgot-password',
    REGISTRATION = '/signup',
    SUCCESSFUL_RECOVERY = '/successful-recovery',
    SET_NEW_PASSWORD = '/set-new-password/:token'
}

const App: React.FC = () => {
    const isInitialized = useAppSelector(state => state.app.initializedApp)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeCheck())
    }, [])

    if (!isInitialized) {
        return <div>LOADING...</div>
    }
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
                <Route path={PATH.LOGIN} element={<Login />} />
                <Route path={PATH.FORGOT} element={<ForgotPassword />} />
                <Route path={PATH.SUCCESSFUL_RECOVERY} element={<SuccessfulRecovery />} />
                <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword />} />
                <Route path={PATH.REGISTRATION} element={<Registration />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route path={PATH.PACKS} element={<Packs />} />
                <Route path={PATH.CARDS} element={<Cards />} />
                
                
               
            </Routes>
            <CustomizedSnackbars />
        </div>
    );
}

export default App;

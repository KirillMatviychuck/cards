import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import Packs from "../components/Packs/Packs";
import Cards from "../components/Cards/Cards";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import SignUp from "../components/SignUp/SignUp";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { initializeCheck } from "./app-reducer";
import CustomizedSnackbars from '../common/CustomizedSnackbar/CustomizedSnackbar';

export enum PATH {
    LOGIN = '/login',
    PROFILE = '/profile',
    PACKS = '/packs',
    CARDS = '/cars',
    FORGOT = '/forgot-password',
    REGISTRATION = '/signup'
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
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
                <Route path={PATH.LOGIN} element={<Login />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route path={PATH.PACKS} element={<Packs />} />
                <Route path={PATH.CARDS} element={<Cards />} />
                <Route path={PATH.FORGOT} element={<ForgotPassword />} />
                <Route path={PATH.REGISTRATION} element={<SignUp />} />
            </Routes>
            <CustomizedSnackbars />
        </div>
    );
}

export default App;

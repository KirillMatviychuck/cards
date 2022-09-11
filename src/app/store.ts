import {combineReducers} from "redux";
import {loginReducer} from "../components/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {profileReducers} from "../components/Profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {forgotReducer} from "../components/ForgotPassword/forgot-reducer";
import {registrationReducer} from "../components/Registration/registration-reducer";
import {newPasswordReducer} from "../components/SetNewPassword/set-new-password-reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    forgot: forgotReducer,
    registration: registrationReducer,
    setNewPassword: newPasswordReducer,
    profile: profileReducers,
    app: appReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store
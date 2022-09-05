import { combineReducers } from "redux";
import { loginReducer } from "../components/Login/login-reducer";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { profileReducers } from "../components/Profile/profile-reducer";
import { appReducer } from "./app-reducer";
import { forgotReducer } from "../components/ForgotPassword/forgot-reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducers,
    app: appReducer,
    forgot: forgotReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store
import React from 'react';
import classes from './Login.module.scss'
import { Navigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { signIn } from "./login-reducer";
import { PATH } from "../../app/App";

const Login = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate(values) {
            if (!values.email && !values.password) {
                return {
                    email: 'Email is required',
                    password: 'Enter your password'
                }
            }
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Enter your password'
                }
            }
        },
        onSubmit: values => {
            const payload = {
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe
            }
            dispatch(signIn(payload))
        },
    });

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE} />
    }

    return (
        <div className={classes.loginWrap}>
            <form className={classes.loginBlock} onSubmit={formik.handleSubmit}>
                <h2 className={classes.title}>Sign In</h2>
                <div className={classes.mainInputBlock}>
                    <label htmlFor="email"
                        className={formik.errors.email && formik.touched.email ? classes.labelError : classes.label}>Email</label>
                    <input
                        className={formik.errors.email && formik.touched.email ? classes.loginInputsError : classes.loginInputs}
                        type="email"
                        {...formik.getFieldProps('email')}

                    />
                    {formik.touched.email && formik.errors.email && <div className={classes.emailError}>Email is required</div>}
                    <label htmlFor="password"
                        className={formik.errors.password && formik.touched.password ? classes.labelError : classes.label}>Password</label>
                    <input
                        className={formik.errors.password && formik.touched.password ? classes.loginInputsError : classes.loginInputs}
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && <div className={classes.emailError}>Password is required</div>}
                    <div className={classes.rememberForgotBlock}>
                        <div className={classes.rememberMeBlock}>
                            <label htmlFor="rememberMe">Remember me</label>
                            <input
                                type="checkbox"
                                checked={formik.values.rememberMe}
                                {...formik.getFieldProps('rememberMe')}
                            />
                        </div>
                        <NavLink to={'/forgot-password'} className={classes.forgotPassword}>Forgot password?</NavLink>
                    </div>
                </div>
                <button type="submit" className={classes.submitButton}>Log In</button>
                <div className={classes.signUp}>
                    <div className={classes.info}>Don't have an account?</div>
                    <NavLink to={'/signup'} className={classes.signUpLink}>
                        Sign Up
                    </NavLink>
                </div>

            </form>
        </div>
    );
};

export default Login;
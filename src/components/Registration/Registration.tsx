import React, {useState} from 'react';
import {useFormik} from "formik";
import classes from './Registration.module.scss'
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../app/App";
import {registerUser} from "./registration-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";

const SignUp = () => {
    const {isSuccess}  = useAppSelector(state => state.registration)
    const {isLoggedIn} = useAppSelector(state => state.login)

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'You need to write an email';
                setIsValid(false)
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                setIsValid(false)
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                setIsValid(false)
                errors.password = 'You need to write a password'
            } else if (values.password.length < 8) {
                setIsValid(false)
                errors.password = 'Password must be more than 8 characters'
            }

            if (!values.confirmPassword) {
                setIsValid(false)
                errors.confirmPassword = 'You need to write a confirm password'
            } else if (values.confirmPassword !== values.password) {
                setIsValid(false)
                errors.confirmPassword = "Passwords don't match!"
            }

            if (!errors.email && !errors.confirmPassword && !errors.password) {
                setIsValid(true)
            } else {
                setIsValid(false)
            }

            return errors
        },
        onSubmit: values => {
            dispatch(registerUser({email: values.email, password: values.password}))
        },
    })

    const togglePassword = () => setPasswordShown(!passwordShown)

    if (isSuccess || isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div className={classes.regWrapper}>
            <div className={classes.reg}>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className={classes.title}>Sign Up</h1>
                    <div>
                        <TextField label="Email"
                                   error={!!formik.errors.email && !!formik.touched.email}
                                   size='small'
                                   margin='dense'
                                   fullWidth
                                   variant='standard'
                                   helperText={formik.errors.email}
                                   {...formik.getFieldProps('email')}
                        />
                        <TextField label="Password"
                                   error={!!formik.errors.password && !!formik.touched.password}
                                   helperText={formik.errors.password}
                                   type={passwordShown ? 'text' : 'password'}
                                   size="small"
                                   margin='dense'
                                   fullWidth
                                   variant='standard'
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   onClick={togglePassword}
                                               >
                                                   {passwordShown ? <Visibility/> : <VisibilityOff/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                                   {...formik.getFieldProps('password')}
                        />
                        <TextField label="Confirm password"
                                   error={!!formik.errors.confirmPassword && !!formik.touched.confirmPassword}
                                   helperText={formik.errors.confirmPassword}
                                   type={passwordShown ? 'text' : 'password'}
                                   size="small"
                                   margin='dense'
                                   fullWidth
                                   variant='standard'
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   onClick={togglePassword}
                                               >
                                                   {passwordShown ? <Visibility/> : <VisibilityOff/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                                   {...formik.getFieldProps('confirmPassword')}
                        />
                    </div>
                    <div style={{margin: '60px 0 31px 0'}}>
                        <Button fullWidth
                                variant='contained'
                                type={"submit"}
                                disabled={!isValid}
                                className={classes.btn}
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
                <div className={classes.signIn}>
                    <span className={classes.info}>Don't have an account?</span>
                    <NavLink to={PATH.PROFILE} className={classes.signInLink}>
                        Sign In
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export default SignUp;
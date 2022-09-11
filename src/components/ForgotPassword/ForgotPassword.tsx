import {Button, FormControl, FormGroup, FormHelperText, FormLabel, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import {PATH} from '../../app/App';
import {useAppDispatch, useAppSelector} from '../../app/hooks/hooks';
import {emailRecover} from './forgot-reducer';
import classes from './ForgotPassword.module.scss'

const ForgotPassword = () => {
    const recoveredMail = useAppSelector(state => state.forgot.recoveredMail)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            dispatch(emailRecover({email: values.email}))
        },
    });

    if (recoveredMail) {
        return <Navigate to={PATH.SUCCESSFUL_RECOVERY}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormControl className={classes.mainWrap}>
                    <FormLabel sx={{
                        fontSize: '25px',
                        fontWeight: '700'
                    }}>Forgot your password?</FormLabel>
                    <FormGroup className={classes.emailBlock}>
                        <TextField
                            type='email'
                            variant="outlined"
                            label='Enter your email'
                            {...formik.getFieldProps('email')}
                        ></TextField>
                        <FormHelperText>Enter your email address and we will sent you further instructions</FormHelperText>
                    </FormGroup>
                    <Button variant='contained' type='submit'>Send instructions</Button>
                    <FormGroup className={classes.infoBlock}>
                        <FormHelperText>Did you remember your password?</FormHelperText>
                        <NavLink className={classes.loginLink} to={PATH.LOGIN}>Try logging in</NavLink>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    );
};

export default ForgotPassword;
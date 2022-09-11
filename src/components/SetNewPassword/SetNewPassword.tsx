import React from 'react';
import classes from "./SetNewPassword.module.scss"
import {Button, FormControl, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks/hooks";
import {useFormik} from "formik";
import {PATH} from "../../app/App";
import {setNewPassword} from "./set-new-password-reducer";


const SetNewPassword = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    let {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: values => {
            dispatch(setNewPassword({password: values.password, resetPasswordToken: token}))
            navigate(PATH.LOGIN)
        },
    });


    return (
        <div className={classes.setBlock}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <div className={classes.title}>Create new password</div>
                            </FormLabel>
                            <FormGroup>

                                <TextField
                                    className={classes.input}
                                    type="password"
                                    variant="standard"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />

                                <div className={classes.text}>
                                    Create new password and we will send you further instructions to email
                                </div>


                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Create new password
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default SetNewPassword;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";
import {errorHandling, successHandling} from "../../app/app-reducer";

export const setNewPassword = createAsyncThunk('newPassword', async (arg: {password: string, resetPasswordToken: string | undefined}, {dispatch, rejectWithValue}) => {
    try {
        await authAPI.setNewPassword(arg.password, arg.resetPasswordToken)
        dispatch(successHandling({success: 'your password was changed'}))
        return {isPasswordSent: true}
    } catch (e) {
        dispatch(errorHandling({error: 'something went wrong, try later'}))
        return rejectWithValue({error: 'something went wrong'})
    }
})

const setNewPasswordSlice = createSlice({
    name: 'newPassword',
    initialState: {
        isPasswordSent: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setNewPassword.fulfilled, (state, action) => {
                state.isPasswordSent = action.payload.isPasswordSent
        })
    }
})

export const newPasswordReducer = setNewPasswordSlice.reducer
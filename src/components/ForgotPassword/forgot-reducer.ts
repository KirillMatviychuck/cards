import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";

export const emailRecover = createAsyncThunk('forgot/emailRecover',
    async (arg: { email: string }, {rejectWithValue}) => {
        try {
            await authAPI.forgotPassword(arg.email)
            return {email: arg.email}
        } catch (error) {
            return rejectWithValue({error: 'some error'})
        }
    })

const mailText = `<div style="background-color: lime; padding: 15px">
<a href='http://localhost:3000/#/set-new-password/$token$'>password recovery link</a>
</div>`

const forgotSlice = createSlice({
    name: 'forgot',
    initialState: {
        adminName: 'test-front-admin <ai73a@yandex.by>',
        textForUser: mailText,
        recoveredMail: null
    } as InitialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(emailRecover.fulfilled, (state, action) => {
                state.recoveredMail = action.payload.email
            })
    }
})

export const forgotReducer = forgotSlice.reducer

type InitialState = {
    adminName: string
    textForUser: string
    recoveredMail: null | string
}
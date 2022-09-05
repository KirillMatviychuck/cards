import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";

export const emailRecover = createAsyncThunk('forgot/emailRecover',
    async (arg: { email: string, from: string, message: string }, { rejectWithValue }) => {
        try {
            const response = await authAPI.forgotPassword(arg.email, arg.from, arg.message)
            debugger
        } catch (error) {
            debugger
            rejectWithValue({ error: 'some error' })
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
        isMailSent: null
    } as InitialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(emailRecover.fulfilled, (state, action) => {
                state.isMailSent = true
            })
    }
})

export const forgotReducer = forgotSlice.reducer

type InitialState = {
    adminName: string
    textForUser: string
    isMailSent: null | boolean
}
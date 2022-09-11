import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";
import {errorHandling} from "../../app/app-reducer";

export const registerUser = createAsyncThunk('registration/registerUser',
    async (arg: {email: string, password: string}, {rejectWithValue, dispatch}) => {
    try {
        await authAPI.userRegistration(arg.email, arg.password)
        return {isSuccess: true}
    } catch (err) {
        const errors = err as RejectedError
        dispatch(errorHandling({error: errors.response.data.error}))
        return rejectWithValue({error: errors.response.data.error})
    }
})

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        isSuccess: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isSuccess = action.payload.isSuccess
            })
    }
})

type ResponseError = {
    data: {error: string, email: string, in: string}
    status: number
    statusText: string
}
type RejectedError = {
    code: string
    message: string
    name: string
    response: ResponseError
}

export const registrationReducer = registrationSlice.reducer
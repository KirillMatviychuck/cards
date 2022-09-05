import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";
import {errorHandling} from "../../app/app-reducer";
import {fetchProfileData} from "../Profile/profile-reducer";

export const signIn = createAsyncThunk('login/signIn',
    async (param: { email: string, password: string, rememberMe: boolean }, { dispatch, rejectWithValue }) => {
        const payload = {
            email: param.email,
            password: param.password,
            rememberMe: param.rememberMe
        }
        try {
            const data = await authAPI.login(payload)
            const { name, email, avatar, _id } = data
            dispatch(fetchProfileData({ name, email, avatar, _id }))
            return { isLoggedIn: true }
        } catch (err: any) {
            dispatch(errorHandling({ error: err.response.data.error }))
            return rejectWithValue({ error: 'something went wrong' })
        }
    })

export const logout = createAsyncThunk('login/logout', async (param, { rejectWithValue }) => {
    try {
        await authAPI.logout()
        return { isLoggedIn: false }
    } catch (error) {
        return rejectWithValue({ error: 'something went wrong' })
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const loginReducer = loginSlice.reducer
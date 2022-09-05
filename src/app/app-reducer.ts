import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";
import {fetchProfileData} from "../components/Profile/profile-reducer";

export const initializeCheck = createAsyncThunk('app/isAuthorized', async (arg, { dispatch, rejectWithValue }) => {
    try {
        const data = await authAPI.isInitialized()
        const { name, email, avatar, _id } = data
        dispatch(fetchProfileData({ name, email, avatar, _id }))
        return { isInitialized: true }
    } catch (err: any) {
        return rejectWithValue({ error: 'something went wrong' })
    } finally {
        dispatch(initializeApp({ isInitialize: true }))
    }
})

const appSlice = createSlice({
    name: 'app',
    initialState: {
        initializedApp: false,
        error: null
    } as initialStateType,
    reducers: {
        initializeApp(state, action: PayloadAction<{ isInitialize: boolean }>) {
            state.initializedApp = action.payload.isInitialize
        },
        errorHandling(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    }
})
export const { initializeApp, errorHandling } = appSlice.actions

type initialStateType = {
    initializedApp: boolean
    error: string | null
}

export const appReducer = appSlice.reducer

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../../api/api";

export const changeName = createAsyncThunk('profile/changeName', async (arg: { name: string, avatar: string }, {rejectWithValue}) => {
    try {
        const response = await profileAPI.setUserName(arg.name, arg.avatar)
        return {name: response.updatedUser.name}
    } catch (error: any) {
        return rejectWithValue({error: 'some error'})
    }

})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        name: '',
        email: '',
        avatar: null,
        _id: '',
        error: null

    } as RootProfile,
    reducers: {
        fetchProfileData(state, action: PayloadAction<RootProfile>) {
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state._id = action.payload._id
        }
    },
    extraReducers: builder => {
        builder.addCase(changeName.fulfilled, (state, action) => {
            state.name = action.payload.name
        })
    }
})

export const {fetchProfileData} = profileSlice.actions

export const profileReducers = profileSlice.reducer

type RootProfile = {
    name: string
    email: string
    avatar: string | null
    _id: string
    error?: null | string
}
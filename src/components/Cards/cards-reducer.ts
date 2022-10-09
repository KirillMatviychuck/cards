import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {cardsAPI} from "../../api/api";

const getPackCards = createAsyncThunk('cards/getPackCards', async (arg, {rejectWithValue}) => {
    try {
        const res = await cardsAPI.getCard('cards/card')
    } catch (e) {

    }
})

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {},
    reducers: {}
})

export const cardsReducer = cardsSlice.reducer
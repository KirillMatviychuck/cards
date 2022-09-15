import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI} from "../../api/api";
import {GetPacksPayload, SinglePack} from "../../api/api-types";

export const getPacks = createAsyncThunk('packs/getPacks', async (arg: {payload?: GetPacksPayload}, {rejectWithValue}) => {
    try {
        const res = await cardsAPI.getPacks()
        return {...res.data}
    } catch (e) {
        return rejectWithValue({error: 'something went wrong'})
    }
})


const initialState: InitialState = {
    cardPacks: [
        {
            cardsCount: 0,
            created: '',
            deckCover: '',
            grade: 0,
            more_id: '',
            name: '',
            path: '',
            private: false,
            rating: 0,
            shots: 0,
            type: '',
            updated: '',
            user_id: '',
            user_name: '',
            __v: 0,
            _id: ''
        },
    ],
    cardPacksTotalCount: 100,
    maxCardsCount: null,
    minCardsCount: null,
    page: 0,
    pageCount: 10
}

const packsSlice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<{currentPage: number}>) {
            state.page = action.payload.currentPage
        },
        setPageCount(state, action: PayloadAction<{pageCount: number}>) {
            state.pageCount = action.payload.pageCount
        }
    },
    extraReducers: builder => {
        builder.
        addCase(getPacks.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.page = action.payload.page
            state.pageCount = action.payload.pageCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.minCardsCount = action.payload.minCardsCount
        })
    }
})

export const {setCurrentPage, setPageCount} = packsSlice.actions
export const packsReducer = packsSlice.reducer

type InitialState = {
    cardPacks: SinglePack[]
    cardPacksTotalCount: number
    maxCardsCount: number | null
    minCardsCount: number | null
    page: number
    pageCount: number
}
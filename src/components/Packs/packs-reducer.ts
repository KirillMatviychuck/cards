import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {packsAPI} from "../../api/api";
import {CreatePackPayload, GetPacksPayload, SinglePack} from "../../api/api-types";

export const getPacks = createAsyncThunk('packs/getPacks', async (arg: GetPacksPayload, {rejectWithValue}) => {
    try {
        const res = await packsAPI.getPacks(arg)
        return {...res.data}
    } catch (e) {
        return rejectWithValue({error: 'something went wrong'})
    }
})
export const addNewPack = createAsyncThunk('packs/addNewPack', async (arg: CreatePackPayload, {rejectWithValue}) => {
    try {
        const res = await packsAPI.createNewPack(arg)
        return {...res.data}
    } catch (e) {
        return rejectWithValue({error: 'something went wrong'})
    }
})

export const deletePack = createAsyncThunk('packs/deletePack', async (packId: string, {rejectWithValue}) => {
    try {
        const res = await packsAPI.deletePack(packId)
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
    cardPacksTotalCount: 10,
    maxCardsCount: 0,
    minCardsCount: 20,
    page: 0,
    pageCount: 10,
    onlyMyPacks: false,
    searchField: ''
}

const packsSlice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setSearchField(state, action: PayloadAction<{ text: string }>) {
            state.searchField = action.payload.text
        },
        setButtonFilter(state, action: PayloadAction<{ value: boolean }>) {
            state.onlyMyPacks = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(getPacks.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.pageCount = action.payload.pageCount
            state.page = action.payload.page
            state.maxCardsCount = action.payload.maxCardsCount
            state.minCardsCount = action.payload.minCardsCount
        })
            .addCase(addNewPack.fulfilled, (state, action) => {
                state.cardPacks.unshift({...action.payload.newCardsPack, deckCover: ''})
            })
            .addCase(deletePack.fulfilled, (state, action) => {
                state.cardPacks.forEach((pack, index) => {
                    if (pack._id === action.payload.deletedCardsPack._id) {
                        state.cardPacks.splice(index, 1)
                    }
                })
            })
    }
})

export const {setSearchField, setButtonFilter} = packsSlice.actions
export const packsReducer = packsSlice.reducer

type InitialState = {
    cardPacks: SinglePack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    onlyMyPacks: boolean
    searchField: string
}
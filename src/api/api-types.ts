//authAPI
export type LoginResponse = {
    _id: string
    email: string
    rememberMe: boolean,
    isAdmin: boolean,
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: null
}

export type LoginData = {
    email: string
    password: string
    rememberMe: boolean
}

//profileApi
export type ChangeNameResponse = {
    token: string
    tokenDeathTime: number
    updatedUser: LoginResponse
}

//packsAPI
export type GetPacksPayload = {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
}

export type GetPacksResponse = {
    cardPacks: SinglePack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CreatePackPayload = {
    name: string
    deckCover?: string
    private?: boolean
}

export type CreatePackResponse = {
    newCardsPack: ReturnedPack
    token: string
    tokenDeathTime: number
}

export type ReturnedPack = Omit<SinglePack, "deckCover">

export type SinglePack = {
    cardsCount: number
    created: string
    deckCover: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}


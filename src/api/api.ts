import axios from "axios"

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginData) {
        return instance.post<LoginResponse>('auth/login', data)
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/me')
    },
    isInitialized() {
        return instance.post<LoginResponse>('auth/me')
            .then(res => res.data)
    },
    forgotPassword(email: string, from: string, message: string) {
        return instance.post('auth/forgot', { email, from, message })
    }

}

export const profileAPI = {
    setUserName(name: string, avatar: string) {
        return instance.put<ChangeNameResponse>('auth/me', { name })
            .then(res => res.data)
    }
}

type LoginResponse = {
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

type LoginData = {
    email: string
    password: string
    rememberMe: boolean
}

type ChangeNameResponse = {
    token: string
    tokenDeathTime: number
    updatedUser: LoginResponse
}

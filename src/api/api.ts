import axios from "axios"
import {EMAIL_TEMPLATE} from "../components/ForgotPassword/recoverMessage";
import {
    ChangeNameResponse,
    CreatePackPayload, CreatePackResponse,
    GetPacksPayload,
    GetPacksResponse,
    LoginData,
    LoginResponse
} from "./api-types";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    userRegistration(email: string, password: string) {
        return instance.post('auth/register', {email, password})
            .then(res => res.data)
    },
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
    forgotPassword(email: string) {
        return instance.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {email, message: EMAIL_TEMPLATE})
    },
    setNewPassword(password: string, resetPasswordToken: string | undefined) {
        return instance.post('auth/set-new-password', {password, resetPasswordToken})
            .then(res => res.data)
    }
}

export const profileAPI = {
    setUserName(name: string, avatar: string) {
        return instance.put<ChangeNameResponse>('auth/me', {name})
            .then(res => res.data)
    }
}

export const packsAPI = {
    getPacks(data?: GetPacksPayload) {
        return instance.get<GetPacksResponse>('cards/pack', {params: {...data}})
    },
    createNewPack(data: CreatePackPayload) {
        return instance.post<CreatePackResponse>('cards/pack',{cardsPack: data})
    },
    deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
            .then(res => {
                return res
            })
    }
}


import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:5000/api/user/',
    baseURL: 'https://mern-stack-shop-app.herokuapp.com/api/user/',
    withCredentials: true
})

export interface registerType {
    name: string
    lastName: string
    email: string
    password: string
}

export interface loginType {
    email: string
    password: string
}

export interface basicResponseType {
    success: boolean
    message: string
}

interface authResponseType {
    isAuthorized: boolean
    id: string | undefined
    email: string | undefined
    name: string | undefined
    lastName: string | undefined
    role: number | undefined
}

export const userAPI = {
    register({name, lastName, email, password}: registerType) {
        return instance.post<basicResponseType>(`register`, {name, lastName, email, password})
    },
    login({email, password}: loginType) {
        return instance.post<basicResponseType>(`login`, {email, password})
    },
    auth() {
        return instance.get<authResponseType>(`auth`)
    },
    logout() {
        return instance.get<basicResponseType>(`logout`)
    }
}
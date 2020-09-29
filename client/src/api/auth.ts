import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:5000/api/user/',
    baseURL: 'https://mern-stack-shop-app.herokuapp.com/api/user/',
    withCredentials: true
})

export type registerType = {
    name: string
    lastName: string
    email: string
    password: string
}

export type loginType = {
    email: string
    password: string
}

type basicResponseType = {
    success: boolean
    message: string
}

type authResponseType = {
    isAuth: boolean
    email: string
    name: string
    lastName: string
    role: number
    success?: boolean
    message?: string
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
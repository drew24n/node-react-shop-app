import {instance} from "./config";
import {authResponseType, userApiResponseType, loginType, registerType} from "../interfaces/authApiType";

export const userAPI = {
    register({name, lastName, email, password}: registerType) {
        return instance.post<userApiResponseType>('/api/user/register', {name, lastName, email, password})
    },
    login({email, password}: loginType) {
        return instance.post<userApiResponseType>('/api/user/login', {email, password})
    },
    auth() {
        return instance.get<authResponseType>('/api/user/auth')
    },
    logout() {
        return instance.get<userApiResponseType>('/api/user/logout')
    }
}
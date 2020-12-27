import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV
        : process.env.REACT_APP_PROD,
    withCredentials: true
})
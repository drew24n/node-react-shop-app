import {loginType, registerType, userAPI} from "../api/user";
import {notification} from 'antd';
import {ThunkAction} from 'redux-thunk';
import {stateType} from "./store";

const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_IS_INITIALIZED = "SET_IS_INITIALIZED"

const initialState = {
    isAuthorized: false,
    isFetching: false,
    isInitialized: false
}

export const authReducer = (state = initialState, action: actionsType): typeof initialState => {
    switch (action.type) {
        case SET_IS_AUTHORIZED:
            return {...state, isAuthorized: action.isAuthorized}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

type setIsAuthorizedType = {
    type: typeof SET_IS_AUTHORIZED
    isAuthorized: boolean
}

type setIsFetchingType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

type setIsInitializedType = {
    type: typeof SET_IS_INITIALIZED
    isInitialized: boolean
}

type actionsType = setIsAuthorizedType | setIsFetchingType | setIsInitializedType
type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>

export const setIsAuthorized = (isAuthorized: boolean): setIsAuthorizedType => ({type: SET_IS_AUTHORIZED, isAuthorized})
const setIsFetching = (isFetching: boolean): setIsFetchingType => ({type: SET_IS_FETCHING, isFetching})
const setIsInitialized = (isInitialized: boolean): setIsInitializedType => ({type: SET_IS_INITIALIZED, isInitialized})

const notificationError = (message: string) => notification.error({
    message: message.toString(), duration: 5, placement: 'bottomRight'
})
const notificationSuccess = (message: string) => notification.success({
    message: message.toString(), duration: 5, placement: 'bottomRight'
})

export const register = ({name, lastName, email, password}: registerType): thunkActionType => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        let response = await userAPI.register({name, lastName, email, password})
        if (response.data.success === true) {
            notificationSuccess(response.data.message)
        } else if (response.data.success === false) {
            notificationError(response.data.message)
        }
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const login = ({email, password}: loginType): thunkActionType => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        let response = await userAPI.login({email, password})
        if (response.data.success === true) {
            dispatch(setIsAuthorized(true))
        } else if (response.data.success === false) {
            notificationError(response.data.message)
        }
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const authMe = (): thunkActionType => async (dispatch) => {
    try {
        let response = await userAPI.auth()
        if (response.data.isAuth) {
            dispatch(setIsAuthorized(true))
        } else if (response.data.success === false && response.data.message) {
            notificationError(response.data.message)
        }
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsInitialized(true))
    }
}

export const logout = (): thunkActionType => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        let response = await userAPI.logout()
        if (response.data.success === true) {
            dispatch(setIsAuthorized(false))
        } else if (response.data.success === false) {
            notificationError(response.data.message)
            dispatch(setIsAuthorized(false))
        }
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}
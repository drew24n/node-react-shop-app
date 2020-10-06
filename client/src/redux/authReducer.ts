import {loginType, registerType, userAPI} from "../api/auth";
import {notification} from 'antd';
import {ThunkAction} from 'redux-thunk';
import {stateType} from "./store";
import {createHashHistory} from 'history';

const SET_AUTH_DATA = "SET_AUTH_DATA"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_IS_INITIALIZED = "SET_IS_INITIALIZED"

const initialState = {
    isFetching: false,
    isInitialized: false,
    isAuthorized: false,
    user: {
        id: '' as string | undefined,
        email: '' as string | undefined,
        name: '' as string | undefined,
        lastName: '' as string | undefined,
        role: 0 as number | undefined
    }
}

export const authReducer = (state = initialState, action: actionsType): typeof initialState => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                isAuthorized: action.isAuthorized,
                user: {
                    id: action.id,
                    email: action.email,
                    name: action.name,
                    lastName: action.lastName,
                    role: action.role
                }
            }
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

interface userType {
    isAuthorized: boolean
    id: string | undefined
    email: string | undefined
    name: string | undefined
    lastName: string | undefined
    role: number | undefined
}

interface setAuthDataType extends userType {
    type: typeof SET_AUTH_DATA
}

interface setIsFetchingType {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

interface setIsInitializedType {
    type: typeof SET_IS_INITIALIZED
    isInitialized: boolean
}

type actionsType = setAuthDataType | setIsFetchingType | setIsInitializedType
type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>

export const setAuthData = ({isAuthorized, id, email, name, lastName, role}: userType): setAuthDataType => ({
    type: SET_AUTH_DATA, isAuthorized, id, email, name, lastName, role
})
const setIsFetching = (isFetching: boolean): setIsFetchingType => ({type: SET_IS_FETCHING, isFetching})
const setIsInitialized = (isInitialized: boolean): setIsInitializedType => ({type: SET_IS_INITIALIZED, isInitialized})

export const notificationError = (message: string) => notification.error({
    message: message.toString(), duration: 10, placement: 'bottomRight'
})
const notificationSuccess = (message: string) => notification.success({
    message: message.toString(), duration: 10, placement: 'bottomRight'
})

export const register = ({name, lastName, email, password}: registerType): thunkActionType => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        let response = await userAPI.register({name, lastName, email, password})
        if (response.data.success === true) {
            notificationSuccess(response.data.message)
            createHashHistory().push('/login')
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
            await dispatch(auth())
        } else if (response.data.success === false) {
            notificationError(response.data.message)
        }
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const auth = (): thunkActionType => async (dispatch) => {
    try {
        let response = await userAPI.auth()
        if (response.data.isAuthorized) {
            dispatch(setAuthData({...response.data}))
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
            dispatch(setAuthData({isAuthorized: false, id: '', email: '', name: '', lastName: '', role: 0}))
            createHashHistory().push('/login')
        }
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}
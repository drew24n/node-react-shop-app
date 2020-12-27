import {userAPI} from "../../api/authAPI";
import {createBrowserHistory} from "history";
import {setAuthData, setIsFetching, setIsInitialized} from "../actions/authActions";
import {notificationError, notificationSuccess} from "../../utils/notifications";
import {thunkActionType} from "../../interfaces/authThunksType";
import {loginType, registerType} from "../../interfaces/authApiType";

export const register = ({name, lastName, email, password}: registerType): thunkActionType => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const response = await userAPI.register({name, lastName, email, password})
        if (response.data.success === true) {
            notificationSuccess(response.data.message)
            createBrowserHistory().push('/login')
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
        const response = await userAPI.login({email, password})
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
        const response = await userAPI.auth()
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
        const response = await userAPI.logout()
        if (response.data.success === true) {
            dispatch(setAuthData({isAuthorized: false, id: '', email: '', name: '', lastName: '', role: 0}))
            createBrowserHistory().push('/login')
        }
    } catch (e) {
        notificationError(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}
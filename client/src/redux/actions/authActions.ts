import {userType} from "../../interfaces/userType";
import {setAuthDataType, setIsFetchingType, setIsInitializedType} from "../../interfaces/authActionsType";

export const SET_AUTH_DATA = "SET_AUTH_DATA"
export const SET_IS_FETCHING = "SET_IS_FETCHING"
export const SET_IS_INITIALIZED = "SET_IS_INITIALIZED"

export const setAuthData = ({isAuthorized, id, email, name, lastName, role}: userType): setAuthDataType => ({
    type: SET_AUTH_DATA,
    isAuthorized, id, email, name, lastName, role
})

export const setIsFetching = (isFetching: boolean): setIsFetchingType => ({
    type: SET_IS_FETCHING,
    isFetching
})

export const setIsInitialized = (isInitialized: boolean): setIsInitializedType => ({
    type: SET_IS_INITIALIZED,
    isInitialized
})
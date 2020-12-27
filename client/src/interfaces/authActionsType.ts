import {SET_AUTH_DATA, SET_IS_FETCHING, SET_IS_INITIALIZED} from "../redux/actions/authActions";
import {userType} from "./userType";

export interface setAuthDataType extends userType {
    type: typeof SET_AUTH_DATA
}

export interface setIsFetchingType {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

export interface setIsInitializedType {
    type: typeof SET_IS_INITIALIZED
    isInitialized: boolean
}

export type actionsType = setAuthDataType | setIsFetchingType | setIsInitializedType
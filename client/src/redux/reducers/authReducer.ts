import {SET_AUTH_DATA, SET_IS_FETCHING, SET_IS_INITIALIZED} from "../actions/authActions";
import {actionsType} from "../../interfaces/authActionsType";

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
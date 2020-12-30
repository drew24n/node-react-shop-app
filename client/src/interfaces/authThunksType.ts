import {ThunkAction} from "redux-thunk";
import {actionsType} from "./authActionsType";
import {stateType} from "./stateType";
import {userApiResponseType} from "./authApiType";

export type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>
export type registerThunkType = ThunkAction<Promise<userApiResponseType | undefined>, stateType, unknown, actionsType>
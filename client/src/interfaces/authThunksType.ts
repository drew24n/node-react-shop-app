import {ThunkAction} from "redux-thunk";
import {actionsType} from "./authActionsType";
import {stateType} from "./stateType";

export type thunkActionType = ThunkAction<Promise<void>, stateType, unknown, actionsType>
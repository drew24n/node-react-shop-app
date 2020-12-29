import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {stateType} from "../interfaces/stateType";

export const withAuthRedirect = <T extends object>(Component: ComponentType<T>) => (props: T) => {
    const isAuthorized = useSelector((state: stateType) => state.auth.isAuthorized)
    if (!isAuthorized) {
        return <Redirect to={"/login"}/>
    } else {
        return <Component {...props}/>
    }
}
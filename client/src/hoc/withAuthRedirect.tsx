import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";

interface isAuthorized {
    isAuthorized: boolean
}

export const withAuthRedirect = <T extends object>(Component: ComponentType<T>) => (props: T & isAuthorized) => {
    if (!props.isAuthorized) {
        return <Redirect to={"/login"}/>
    } else {
        return <Component {...props}/>
    }
}
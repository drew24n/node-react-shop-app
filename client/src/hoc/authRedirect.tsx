import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";

export const withAuthRedirect = <T extends object>(Component: ComponentType<T>) => (props: any) => {
    if (!props.isAuthorized) {
        return <Redirect to={"/login"}/>
    } else {
        return <Component {...props}/>
    }
}
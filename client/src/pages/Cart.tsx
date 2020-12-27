import React, {ComponentType} from "react";
import style from '../styles/Cart.module.scss';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

interface cartType {
    isAuthorized: boolean
}

function Cart() {
    return (
        <main className={style.container}>Cart</main>
    )
}

export default compose<ComponentType<cartType>>(withAuthRedirect)(Cart)
import React from "react";
import style from './Cart.module.scss';
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";

const Cart = () => {
    return (
        <main className={style.container}>Cart</main>
    )
}

export default withAuthRedirect(Cart)
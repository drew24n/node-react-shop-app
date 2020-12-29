import React from "react";
import style from '../styles/Cart.module.scss';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

function Cart() {
    return (
        <main className={style.container}>Cart</main>
    )
}

export default compose(withAuthRedirect)(Cart)
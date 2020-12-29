import React from "react";
import style from '../styles/Products.module.scss';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

function Products() {
    return (
        <main className={style.container}>Products</main>
    )
}

export default compose(withAuthRedirect)(Products)
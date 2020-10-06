import React from "react";
import style from './Products.module.scss';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const Products = () => {
    return (
        <main className={style.container}>Products</main>
    )
}

export default withAuthRedirect(Products)
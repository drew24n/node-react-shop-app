import React, {ComponentType} from "react";
import style from '../styles/Products.module.scss';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

interface productsType {
    isAuthorized: boolean
}

function Products() {
    return (
        <main className={style.container}>Products</main>
    )
}

export default compose<ComponentType<productsType>>(withAuthRedirect)(Products)
import React, {ComponentType, memo} from "react";
import style from './Products.module.scss';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

interface productsType {
    isAuthorized: boolean
}

function Products() {
    return (
        <main className={style.container}>Products</main>
    )
}

export default compose<ComponentType<productsType>>(withAuthRedirect, memo)(Products)
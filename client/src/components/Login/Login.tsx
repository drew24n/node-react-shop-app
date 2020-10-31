import React, {memo} from "react";
import style from './Login.module.scss';
import {Button, Input, Spin} from "antd";
import {login} from "../../redux/authReducer";
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {loginType} from "../../api/auth";
import {InjectedFormProps} from "redux-form/lib/reduxForm";

function Login({authState, dispatch}: any) {
    const loginHandler = (payload: loginType) => {
        if (payload) {
            dispatch(login({...payload}))
        }
    }

    if (authState.isAuthorized) return <Redirect to={'/products'}/>

    return (
        <main className={style.container}>
            <Spin spinning={authState.isFetching} size="large">
                <h1>Log in</h1>
                <LoginReduxForm onSubmit={loginHandler}/>
            </Spin>
        </main>
    )
}

const AntInput = (props: any) => <Input {...props.input} {...props} input={null} meta={null}/>

const LoginForm: React.FC<InjectedFormProps<loginType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={'email'} component={AntInput} name={"email"} type={'email'} required/>
            <Field placeholder={'password'} component={AntInput} name={"password"} type={'password'} required/>
            <Button type="primary" htmlType={'submit'}>Enter</Button>
        </form>
    )
}

const LoginReduxForm = reduxForm<loginType>({form: "login"})(LoginForm)

export default memo(Login)
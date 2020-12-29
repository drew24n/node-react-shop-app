import React, {FC} from "react";
import style from '../styles/Register.module.scss';
import {Button, Input, Spin} from "antd";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {register} from "../redux/thunks/authThunks";
import {registerType} from "../interfaces/authApiType";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../interfaces/stateType";

export function Register () {
    const authState = useSelector((state: stateType) => state.auth)
    const dispatch = useDispatch()

    const registerHandler = (payload: registerType) => {
        if (payload) {
            dispatch(register({...payload}))
        }
    }

    if (authState.isAuthorized) return <Redirect to={'/products'}/>

    return (
        <main className={style.container}>
            <Spin spinning={authState.isFetching} size="large">
                <h1>Sign up</h1>
                <LoginReduxForm onSubmit={registerHandler}/>
            </Spin>
        </main>
    )
}

const AntInput = (props: any) => <Input {...props.input} {...props} input={null} meta={null}/>

const RegisterForm: FC<InjectedFormProps<registerType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={'name'} component={AntInput} name={'name'} type={'text'} required minLength={3}
                   maxLength={25}/>
            <Field placeholder={'last name'} component={AntInput} name={'lastName'} type={'text'} required minLength={3}
                   maxLength={25}/>
            <Field placeholder={'email'} component={AntInput} name={'email'} type={'email'} required maxLength={35}/>
            <Field placeholder={'password'} component={AntInput} name={'password'} type={'password'} required
                   minLength={5} maxLength={65}/>
            <Button type='primary' htmlType={'submit'}>Register</Button>
        </form>
    )
}

const LoginReduxForm = reduxForm<registerType>({form: "register"})(RegisterForm)
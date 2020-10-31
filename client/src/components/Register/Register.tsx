import React, {FC, memo} from "react";
import style from './Register.module.scss';
import {Button, Input, Spin} from "antd";
import {register} from "../../redux/authReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {registerType} from "../../api/auth";
import {Redirect} from "react-router-dom";

function Register ({authState, dispatch}: any) {
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

export default memo(Register)
import React from "react";
import s from './Login.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {emailValidator, passValidator} from "../../helpers/inputValidators/loginValidators";
// import {STATUSES} from "../../redux/ActionCreatorsLogin/ActionCreatorsLogin";
import {IBool, LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR, findStatus} from "../../redux/booleanReducer";

interface ILoginState {
    email: string;
    password: string;
    rememberMe: boolean;
    error: string,
    isAuth: boolean,
}

interface IProps {
    state: ILoginState;
    setEmail: (email: string) => void;
    setError: (error: string) => void;
    setPassword: (pass: string) => void;
    rememberMe: (checked: boolean) => void;
    login: () => void;
    status: IBool[]
}

const Login = (props: IProps) => {
    let status;
    if (props.state.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    if (props.status.length != 0) {
        status = findStatus('LOGIN', props.status);
    }
    const onClick = () => {
        let errorMail = emailValidator(props.state.email);
        let errorPass = passValidator(props.state.password);
        if (errorMail) {
            if (errorPass) {
                props.login();
                props.setError('');
            } else {
                props.setError('Inccorect password')
            }
        } else {
            props.setError('Invalid email')
        }
    };
    return (
        <div className={s.loginWrapper}>
            <div className="title">sign-in</div>
            {
                status && <span>{status.message}</span>
            }
            {
                props.state.error && <span>{props.state.error}</span>
            }
            <div className={s.inputWrapper}>
                <input onChange={(e) => props.setEmail(e.currentTarget.value)}
                       value={props.state.email} type="email"/>
                <input onChange={(e) => props.setPassword(e.currentTarget.value)}
                       value={props.state.password}
                       type="password"/>
            </div>
            <NavLink to={'/recovery'}>Forgot password?</NavLink>
            <div className={s.inputRemember}>
                <input onChange={(e) => props.rememberMe(e.currentTarget.checked)}
                       checked={props.state.rememberMe} type="checkbox"/>
                <div>Remember Me</div>
            </div>
            <button disabled={status && status.name === LOGIN_LOADING} onClick={onClick}>Sign in</button>
            <NavLink to={'/register'}>Forgot password?</NavLink>
        </div>
    )
};
export default Login;
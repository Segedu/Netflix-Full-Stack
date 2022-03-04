import { Fragment } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import style from './SignOut.module.css';
import { useContext } from 'react';
import Context from '../context.jsx';

const SignOut = () => {
    const { setAuth } = useContext(Context);

    setTimeout(() => {
        localStorage.removeItem('auth');
    }, 1200000)

    return (<Fragment>
        <button className={style.SignOutBtn} onClick={() => {
            setAuth(null)
            localStorage.removeItem("auth");
        }}><BiLogOutCircle className={style.icons} title="SignOut" /></button>
    </Fragment >)
}

export default SignOut;

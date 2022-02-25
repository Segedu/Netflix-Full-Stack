import { Fragment } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import style from './SignOut.module.css';

const SignOut = ({ setAuth, setFavoritesList, setWatchList }) => {

    setTimeout(() => {
        localStorage.removeItem("auth");
    }, 1200000)

    return (<Fragment>
        <button className={style.SignOutBtn} onClick={() => {
            setAuth(null)
            setWatchList([]);
            setFavoritesList([]);
            localStorage.removeItem("auth");
        }}><BiLogOutCircle className={style.icons} title="SignOut" /></button>
    </Fragment >)
}

export default SignOut;

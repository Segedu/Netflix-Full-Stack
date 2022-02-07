import axios from "axios";
import Spinner from "../../components/Spinner/Spinner.jsx";
import style from '../SignIn/SignIn.module.css';
import { useEffect, useState } from "react";
import { API_KEY } from '../../logic/key';
import { insertNewUser } from "../../clientUtils/clientUtils.jsx";

const SignUp = ({ setAuth, auth }) => {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState()
    const [errorFromServer, setErrorFromServer] = useState(false);
    const [loading, setLoading] = useState(false);
    const LOCAL_STORAGE_AUTH_KEY = "auth";

    function signUp() {
        setLoading(true)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        axios
            .post(url, {
                email: userEmail,
                password: password,
            })
            .then(response => {
                insertNewUser('users', response.data.localId, response.data.email);
                setLoading(false)
                setAuth(response.data);
                localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(response.data));
            })
            .catch(function (error) {
                setErrorFromServer(error.response.data.error.message);
            });
    }

    const emailValidation = (e) => {
        setUserEmail(e.target.value)
    }

    const passwordValidation = (e, setFunction) => {
        if (e.target.value.length > 7 && e.target.value !== ""
            && e.target.value !== 0 && e.target.value !== null) {
            setFunction(e.target.value);
        }
    }

    return (
        <div className="Form">
            <section>{loading ? <Spinner /> : ""}</section>
            <form onSubmit={(e) => {
                e.preventDefault();
                { password === confirmPassword ? signUp() : alert("passwords doesn't match") }
            }}>
                <h1>SignUp</h1>
                <input type="email" onChange={(e) => { emailValidation(e) }} placeholder="Enter Email" /><br></br>
                <input type="password" autoComplete="on" onChange={(e) => { passwordValidation(e, setPassword) }} placeholder="Enter Password" /><br></br>
                <input type="password" autoComplete="on" onChange={(e) => { passwordValidation(e, setConfirmPassword) }} placeholder="Confirm Password" />
                <input type="submit" value="SignUp" onClick={() => {
                }} />
            <h3>{errorFromServer ? errorFromServer : ""}</h3>
            </form>
        </div>
    )
}

export default SignUp;
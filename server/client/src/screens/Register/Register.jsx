import axios from "axios";
import Spinner from "../../components/Spinner/Spinner.jsx";
import style from '../LogIn/LogIn.module.css';
import { useEffect, useState } from "react";
import { API_KEY } from '../../logic/key';
import { insertNewUser } from "../../clientUtils/clientUtils.jsx";

const Register = ({ setAuth, auth }) => {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState()
    const [errorFromServer, setErrorFromServer] = useState(false);
    const [loading, setLoading] = useState(false);
    const LOCAL_STORAGE_AUTH_KEY = "auth";

    // insertNewUser(e, `users`, auth.localId, auth.email);
    // useEffect(() => {
    //     if (localStorage.getItem("auth")) {
    //         let autDetails = JSON.parse(localStorage.getItem("auth"));
    //     }
    // }, [])

    function register() {
        setLoading(true)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        axios
            .post(url, {
                email: userEmail,
                password: password,
            })
            .then(response => {
                setLoading(false)
                setAuth(response.data);
                localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(response.data));
            })
            .catch(function (error) {
                setErrorFromServer(error.message)
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
                if (password === confirmPassword) {
                    register();
                } else {
                    alert("incorrect password")
                }
            }}>
                <h1>Register</h1>
                <input type="email" onChange={(e) => { emailValidation(e) }} placeholder="Enter Email" /><br></br>
                <input type="password" autoComplete="on" onChange={(e) => { passwordValidation(e, setPassword) }} placeholder="Enter Password" /><br></br>
                <input type="password" autoComplete="on" onChange={(e) => { passwordValidation(e, setConfirmPassword) }} placeholder="Confirm Password" />
                <input type="submit" value="Register" onClick={() => {
                }} />
            </form>
            <h3>{errorFromServer ? "Error from server during Registration" : ""}</h3>
        </div>
    )
}

export default Register;
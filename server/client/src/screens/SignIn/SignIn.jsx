import axios from "axios";
import Spinner from '../../components/Spinner/Spinner';
import styles from './SignIn.module.css';
import React from 'react';
import firebase from 'firebase';
import { API_KEY } from '../../logic/key';
import { useState } from "react";
import { firebaseAuth } from '../../firebase';
import { getUserOrMediaDataById } from "../../clientUtils/clientUtils";

const SignIn = ({ setAuth, setWatchList, setFavoritesList }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorFromServer, setErrorFromServer] = useState(false);
    const [loading, setLoading] = useState(false);
    const LOCAL_STORAGE_AUTH_KEY = "auth";
    let usersRoute = 'users';

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebaseAuth.signInWithPopup(provider)
        setAuth(firebaseAuth.currentUser.email)
    }

    const signIn = () => {
        setLoading(true)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        axios
            .post(url, {
                email,
                password,
            })
            .then(function (response) {
                getUserOrMediaDataById(usersRoute, response.data.localId, setWatchList, setFavoritesList);
                setLoading(false)
                setAuth(response.data)
                localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(response.data));
            })
            .catch(function (error) {
                setErrorFromServer(error.response.data.error.message)
            });
    }

    return (
        <div className="Form">
            <section>{loading ? <Spinner /> : ""}</section>
            <form onSubmit={e => {
                e.preventDefault();
                signIn();
            }} >
                <h1>Sign-In</h1>
                <input className={styles.input} type="email" placeholder="Enter Your Email" onChange={(e) => { setEmail(e.target.value) }} /><br></br>
                <input className={styles.input} type="password" placeholder="Enter Your Password" onChange={(e) => { setPassword(e.target.value) }} /><br></br>
                <input className={styles.button} type="submit" value="Sign-In" />
                <button onClick={signInWithGoogle}>Sign-In with Google</button>
                <h3>{errorFromServer ? errorFromServer : ""}</h3>
            </form>
        </div >
    )
}

export default SignIn;
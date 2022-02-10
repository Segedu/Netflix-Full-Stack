import { Fragment } from "react";

const SignOut = ({ setAuth, setFavoritesList, setWatchList }) => {

    setTimeout(() => {
        localStorage.removeItem("auth");
    }, 1200000)

    return (<Fragment>
        <button className="SignOutBtn" onClick={() => {
            setAuth(null)
            setWatchList([]);
            setFavoritesList([]);
            localStorage.removeItem("auth");
        }}>Sign-Out</button>
    </Fragment >)
}

export default SignOut;


// import React from 'react';
// import { auth } from '../firebase';

// function SignOut({ setUser }) {
//     return <div>
//         <button onClick={() => {
//             auth.signOut(),
//                 setUser(null)
//         }
//         }>SignOut</button>
//     </div>;
// }

// export default SignOut;

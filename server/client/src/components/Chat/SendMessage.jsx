import React, { useState } from 'react';
import { db, firebaseAuth } from '../../firebase';
import firebase from 'firebase';
import { IoIosSend } from 'react-icons/io';
import style from './Chat.css';

function SendMessage() {
    const [message, setMessage] = useState('');

    async function sendMessage(e) {
        e.preventDefault();
        const { uid, photoURL } = firebaseAuth.currentUser;
        await db.collection('messages').add({
            text: message,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMessage('');
        // scroll.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="sendMessage">
            <input className='chatMessageInput' type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder='Message...' />
            <button onClick={(e) => { sendMessage(e) }}><IoIosSend className={"icons"} /></button>
        </div>
    )

}

export default SendMessage;

import React, { useEffect, useContext, useState } from 'react';
import Context from '../context';
import { firebaseAuth, db } from '../../firebase';
import SendMessage from './SendMessage';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]),
        { auth } = useContext(Context);

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapShot =>
            setMessages(snapShot.docs.map(doc => doc.data())))
    }, []);

    const elements = messages.map(({ id, uid, text, photoURL }) =>
        <div key={id} className={`message ${uid == firebaseAuth.currentUser.uid ? 'sent' : 'received'}`}>
            <img src={photoURL} alt="user image" className="chatUserImage" />
            <h4>{text}</h4>
        </div >
    )

    return (
        <div className="Chat">
            <div className="messagesCont">{elements}</div>
            <div className="messageBoard"><SendMessage /></div>
        </div>
    )
}
















export default Chat;

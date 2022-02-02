import React, { useEffect, useRef, useState } from 'react';
import { firebaseAuth, db } from '../firebase';
import SendMessage from './SendMessage';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    // const [scroll] = useRef()

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapShot =>
            setMessages(snapShot.docs.map(doc => doc.data()))
        )
    }, []);

    const elements = messages.map(({ id, uid, text, photoURL }) =>
        <div key={id} className={`message ${uid == firebaseAuth.currentUser.uid ? 'sent' : 'received'}`}>
            <img className='chatProfileImg' src={photoURL} alt="" />
            <h4>{text}</h4>
        </div>)

    return <>
        <div className='messages'>
            {elements}
        </div>
        <SendMessage />
        {/* <SendMessage scroll={scroll} /> */}
        {/* <div ref={scroll}></div> */}
    </>;
}
















export default Chat;

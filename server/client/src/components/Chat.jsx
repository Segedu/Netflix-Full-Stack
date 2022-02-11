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
    // git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch server/client/src/video/netflixTrailer.mp4'

    const elements = messages.map(({ id, uid, text, photoURL }) =>
        <div className='messageRow' >
            <div key={id} className={`message ${uid == firebaseAuth.currentUser.uid ? 'sent' : 'received'}`}>
                <img src={photoURL} alt="user image" className="chatUserImage" />
                <h4>{text}</h4>
            </div>
        </div >)

    return <>
        <div className="messagesCont">
            {elements}
        </div>
        <SendMessage />
        {/* <SendMessage scroll={scroll} /> */}
        {/* <div ref={scroll}></div> */}
    </>;
}
















export default Chat;

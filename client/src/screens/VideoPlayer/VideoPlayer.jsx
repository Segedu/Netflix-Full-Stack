import React from 'react';
import Context from '../../components/context';
import { useContext } from 'react';
import style from './VideoPlayer.module.css';

function VideoPlayer({ }) {
    const { movieToPlay } = useContext(Context);

    return (
        <div>
            <iframe className={style.videoPlayer} src={movieToPlay.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}

export default VideoPlayer;

import React from 'react';
import axios from 'axios';
import style from '../screens/Home/Home.module.css';
import movieTrailer from '../video/trailersCollection.mp4';
import { stopMovie, playMovie } from '../clientUtils/clientUtils';

function MainBanner() {
  return (
    <div>
      <video className={style.HomePageTrailer}
        width="1366" height="625"
        onMouseOver={playMovie}
        onMouseOut={stopMovie}
        src={movieTrailer}
        poster="https://image.tmdb.org/t/p/original/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg"
        preload='none'
        muted
        loop
      />
    </div >
  )
}

export default MainBanner;

import React from 'react';
import style from '../screens/Home/Home.module.css';
import netflixBanner from '../video/netflixBanner.mp4'
import { playMovie } from '../clientUtils/clientUtils';

function MainBanner() {
  return (
    <div className={style.bannerCont}>
      <video className={style.bannerVideo}
        onMouseOver={playMovie}
        src={netflixBanner}
        poster="https://image.tmdb.org/t/p/original/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg"
        preload='none'
        muted
        loop
      />
    </div >
  )
}

export default MainBanner;

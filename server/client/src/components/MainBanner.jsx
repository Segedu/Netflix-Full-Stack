import React from 'react';
import axios from 'axios';
import style from '../screens/Home/Home.module.css';

function MainBanner() {
  return (
    <div>
      <iframe className={style.HomePageTrailer} width="1366" height="625" src={"https://www.youtube-nocookie.com/embed/P9mwtI82k6E?autoplay=1&mute=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default MainBanner;

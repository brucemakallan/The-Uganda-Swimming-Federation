import React from 'react';
import YouTube from 'react-youtube';

const renderYoutubeVideo = (height, width, youtubeId) => {
  const options = {
    height: String(height),
    width: String(width),
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      enablejsapi: 1,
      origin: 'http://localhost:3000',
    },
  };
  return (
    <YouTube
      videoId={youtubeId}
      opts={options}
    />
  );
};

export default renderYoutubeVideo;

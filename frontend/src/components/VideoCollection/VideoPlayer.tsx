import React from 'react';

import './VideoCollection.scss';

interface VideoProps {
  videoUrl?: string;
  width?: number;
  height?: number;
}

const VideoPlayer: React.FC<VideoProps> = ({ videoUrl, width = 500, height = 200 }) => {
  const videoIdFromUrl = videoUrl
    ? videoUrl.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      )
    : null;

  console.log(videoIdFromUrl);
  const extractedVideoId = videoIdFromUrl ? videoIdFromUrl[1] : '';

  const embedUrl = `https://www.youtube.com/embed/${extractedVideoId}`;

  return <iframe width={width} height={height} src={embedUrl} allowFullScreen title="Video title" />;
};

export default VideoPlayer;

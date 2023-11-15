import React from 'react';

import './VideoCollection.scss';

interface VideoProps {
  videoId?: string;
  width?: number;
  height?: number;
}

const VideoPlayer: React.FC<VideoProps> = ({ videoId, width = 325, height = 200 }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return <iframe width={width} height={height} src={embedUrl} allowFullScreen title="Video title" />;
};

export default VideoPlayer;

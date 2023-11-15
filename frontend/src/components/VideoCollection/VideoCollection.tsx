import React from 'react';

import Icon, { ICONS, IconSize } from '../SVG/Icon';
import VideoPlayer from './VideoPlayer';
import DateTimeDisplay from '../DateTimeDisplay/DateTimeDisplay';

import './VideoCollection.scss';

export interface VideoItemProps {
  author: string;
  created_at: string;
  description: string;
  id: string;
  title: string;
  updated_at: string;
  user_id: string;
  video: string;
}

interface VideoCollectionProps {
  data: VideoItemProps[];
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
}

const VideoCollection: React.FC<VideoCollectionProps> = ({ data, currentPage, totalPageCount, onPageChange }) => {
  const renderVideoItems = () => {
    return data.map((video) => (
      <div key={video.id} className="video">
        <VideoPlayer videoId={video.video} />
        <div className="video__info">
          <div className="video__info__header">
            <div className="video__info__header__title">
              <h3>{video.title}</h3>
            </div>
            <p>
              <DateTimeDisplay timestamp={video.updated_at} />
            </p>
          </div>
          <div className="video__info__desc" dangerouslySetInnerHTML={{ __html: video.description }} />
        </div>
      </div>
    ));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPageCount);
  };

  return (
    <div>
      <div className="video-collection">{renderVideoItems()}</div>
      <div className="pagination">
        {currentPage > 1 && (
          <div className="icon-nav">
            <button onClick={handleFirstPage} className="button-nav">
              <Icon component={ICONS.FIRST} size={IconSize.XXL} />
            </button>
            <button onClick={handlePrevPage} className="button-nav">
              <Icon component={ICONS.BACKWARD} size={IconSize.XXL} />
            </button>
          </div>
        )}
        <div className="page-number">
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                onPageChange(index + 1);
              }}
              className={`button ${currentPage === index + 1 ? 'clicked' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {currentPage < totalPageCount && (
          <div className="icon-nav">
            <button onClick={handleNextPage} className="button-nav">
              <Icon component={ICONS.FORWARD} size={IconSize.XXL} />
            </button>
            <button onClick={handleLastPage} className="button-nav">
              <Icon component={ICONS.LAST} size={IconSize.XXL} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCollection;

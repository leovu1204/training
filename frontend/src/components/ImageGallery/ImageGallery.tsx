import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon, { ICONS, IconSize } from '../SVG/Icon';
import { GalleryImageProps } from './GalleryImageDetails';

import './ImageGallery.scss';

interface ImageGalleryProps {
  data: GalleryImageProps[];
  onImageClick: (itemId: string) => void;
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ data, onImageClick, currentPage, totalPageCount, onPageChange }) => {
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
    <div className="gallery-container">
      <div className="grid-row">
        {data.map((item, _) => (
          <Link to={`/campaign/${item.id}`} key={item.id}>
            <figure onClick={() => onImageClick(item.id)}>
              <img src={item.image} alt={item.description} />
              <figcaption>{item.title}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
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

export default ImageGallery;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon, { ICONS, IconSize } from '../SVG/Icon';
import GalleryImageDetails, { GalleryImageProps } from './GalleryImageDetails';

import './ImageGallery.scss';

interface ImageGalleryProps {
  data: GalleryImageProps[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ data }) => {
  const itemsPerPage = 12;
  const itemsPerRow = 4;
  const rowsPerPage = 3;
  const totalPageCount = Math.ceil(data.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPageCount);
  };

  return (
    <div className="gallery-container">
      {Array.from({ length: rowsPerPage }, (_, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {currentItems.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((item) => (
            <Link to={`/campaign/${item.id}`} key={item.id}>
              <figure>
                <img src={item.image} alt={item.description} />
                <figcaption>{item.title}</figcaption>
              </figure>
            </Link>
          ))}
        </div>
      ))}
      <div className="pagination">
        {currentPage > 1 && (
          <div className="icon-nav">
            <button onClick={handleFirstPage} className="button-nav">
              <Icon component={ICONS.FIRST} size={IconSize.XL} />
            </button>
            <button onClick={handlePrevPage} className="button-nav">
              <Icon component={ICONS.BACKWARD} size={IconSize.XL} />
            </button>
          </div>
        )}
        <div className="page-number">
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
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
              <Icon component={ICONS.FORWARD} size={IconSize.XL} />
            </button>
            <button onClick={handleLastPage} className="button-nav">
              <Icon component={ICONS.LAST} size={IconSize.XL} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;

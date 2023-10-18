import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon, { ICONS, IconSize } from '../SVG/Icon';

import './ImageGallery.scss';

const ImageGallery: React.FC = () => {
  const data = [
    { id: 1, image: '/logo192.png', description: 'Item 1' },
    { id: 2, image: '/logo192.png', description: 'Item 2' },
    { id: 3, image: '/logo192.png', description: 'Item 3' },
    { id: 4, image: '/logo192.png', description: 'Item 4' },
    { id: 5, image: '/logo192.png', description: 'Item 5' },
    { id: 6, image: '/logo192.png', description: 'Item 6' },
    { id: 7, image: '/logo192.png', description: 'Item 7' },
    { id: 8, image: '/logo192.png', description: 'Item 8' },
    { id: 9, image: '/logo192.png', description: 'Item 9' },
    { id: 10, image: '/logo192.png', description: 'Item 10' },
    { id: 11, image: '/logo192.png', description: 'Item 11' },
    { id: 12, image: '/logo192.png', description: 'Item 12' },
    { id: 13, image: '/logo192.png', description: 'Item 13' },
  ];

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
                <figcaption>Album name goes here</figcaption>
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

import React from 'react';

import './GalleryImageDetails.scss';
import { useNavigate } from 'react-router-dom';

export interface GalleryImageProps {
  id: string;
  image: string;
  title: string;
  author: string;
  link: string;
  description: string;
}

const GalleryImageDetails: React.FC<GalleryImageProps> = ({ id, image, title, author, link, description }) => {
  const navigate = useNavigate();

  return (
    <div className="campaign-view">
      <div className="item-wrapper">
        <img src={image} alt="item detail" />
        <div className="item-body">
          <div className="item-body__title">
            <p>{title}</p>
          </div>
          <div className="item-body__author">
            <div className="label">
              <p>작성자</p>
            </div>
            <p>{author}</p>
          </div>
          <div className="item-body__link">
            <div className="label">
              <p>링크</p>
            </div>
            <a href={link}>{link}</a>
          </div>
          <div className="item-body__description">
            <p>{description}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          navigate('/campaign');
        }}
      >
        목록으로
      </button>
    </div>
  );
};

export default GalleryImageDetails;

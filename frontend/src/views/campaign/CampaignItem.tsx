import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import GalleryImageDetails from '../../components/ImageGallery/GalleryImageDetails';

import api from '../../services/apiServices';

import './CampaignView.scss';

const CampaignItem: React.FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dataItem, error } = useQuery(['campaignItem', id], () => api.data.fetchDataById('campaign', id || ''));

  if (error) {
    console.log(error);
  }

  return (
    <div className="campaign-view">
      <div className="campaign-view__top">
        <div className="campaign-view__content">
          <div className="campaign-view__grid-head">
            <div className="campaign-view__title">
              <h2 className="gradual-color-transition">캠페인</h2>
            </div>
          </div>
          {dataItem && (
            <GalleryImageDetails
              id={dataItem.id}
              image={dataItem.image}
              title={dataItem.title}
              author={dataItem.author}
              link={dataItem.link}
              description={dataItem.content}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignItem;

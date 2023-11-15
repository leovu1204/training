import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import TableRowDetails from '../../components/Table/TableRowDetails';

import api from '../../services/apiServices';

import './AnnView.scss';

const AnnItem: React.FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dataItem, error } = useQuery(['annItem', id], () => api.data.fetchDataById('notice', id || ''));

  if (error) {
    console.log(error);
  }

  const handleDisplayItem = (itemId: string) => {
    navigate(`/announcement/${itemId}`);
  };

  return (
    <div className="ann-view">
      <div className="ann-view__top">
        <div className="ann-view__content">
          <div className="ann-view__table-head">
            <div className="ann-view__title">
              <h2 className="gradual-color-transition">공지사항</h2>
            </div>
          </div>
          {dataItem && (
            <TableRowDetails
              author={dataItem.author}
              content={dataItem.content}
              createdAt={dataItem.created_at}
              id={dataItem.id}
              title={dataItem.title}
              updatedAt={dataItem.updated_at}
              userId={dataItem.user_id}
              onNextItem={() => handleDisplayItem(dataItem.next ?? '')}
              onPrevItem={() => handleDisplayItem(dataItem.previous ?? '')}
              hasNext={!!dataItem.next}
              hasPrev={!!dataItem.previous}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnItem;

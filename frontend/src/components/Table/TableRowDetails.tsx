import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DateTimeDisplay from '../DateTimeDisplay/DateTimeDisplay';

import './TableRowDetails.scss';

export interface TableRowProps {
  author: string;
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  userId: string;
  hasNext: boolean;
  hasPrev: boolean;
  onNextItem: () => void;
  onPrevItem: () => void;
}

const TableRowDetails: React.FC<TableRowProps> = ({
  author,
  content,
  createdAt,
  id,
  title,
  updatedAt,
  userId,
  hasNext,
  hasPrev,
  onNextItem,
  onPrevItem,
}) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/');
  const currentLocation = location[1];

  const handleGoBack = () => {
    navigate(`../${currentLocation}`);
  };

  return (
    <div className="talbe-detail">
      <div className="table-detail__title">
        <p>{title}</p>
      </div>
      <div className="table-detail__pre-body">
        <div className="table-detail__author">
          <div className="label">
            <p>작성자</p>
          </div>
          <p>{author}</p>
        </div>
        <div className="table-detail__date">
          <div className="label">
            <p>작성일</p>
          </div>
          <p>
            <DateTimeDisplay timestamp={createdAt} />
          </p>
        </div>
      </div>
      <div className="table-detail__description" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="buttons-container">
        {hasPrev && (
          <button onClick={onPrevItem} className="backward-button">
            이전 글
          </button>
        )}
        <button onClick={handleGoBack} className="return-button">
          목록으로
        </button>
        {hasNext && (
          <button onClick={onNextItem} className="forward-button">
            다음 글
          </button>
        )}
      </div>
    </div>
  );
};

export default TableRowDetails;

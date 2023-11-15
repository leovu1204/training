import React from 'react';
import Modal, { ModalWidth } from '../../components/Modal/DialogModal';

import './ItemModal.scss';

interface FacilityDetails {
  date: string;
  hour: number;
  amount: number;
  effort: number;
}

export interface FacilityItem {
  numbering: number;
  district: string;
  title: string;
  img: string;
  location: string;
  dimension: string;
  status: string;
  details?: FacilityDetails[];
}

interface ModalProps {
  facilityItem: FacilityItem;
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal: React.FC<ModalProps> = ({ facilityItem, isOpen, onClose }) => {
  return (
    <Modal dataId="" isOpen={isOpen} onClose={onClose} disableCloseButton className="modal-container" width={ModalWidth.XL}>
      <h2>{facilityItem.title} 쓰레기 수거 정보</h2>
      <div className="modal-content">
        <img src={facilityItem.img} alt={facilityItem.title} />
        <div className="collection-table">
          <table>
            <thead>
              <tr>
                <th>수거일자</th>
                <th>수거시간</th>
                <th>수거량</th>
                <th>투입인력</th>
              </tr>
            </thead>
            <tbody>
              {facilityItem.details && facilityItem.details.length > 0 ? (
                facilityItem.details.map((detail, index) => (
                  <tr key={detail.date}>
                    <td>{detail.date}</td>
                    <td>{detail.hour}시간</td>
                    <td>{detail.amount}T</td>
                    <td>{detail.effort}명</td>
                  </tr>
                ))
              ) : (
                <div />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;

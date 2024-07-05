import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as MyMap } from '../../common/assets/images/map.svg';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import ItemModal, { FacilityItem } from './ItemModal';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import CustomTable from '../../components/Table/CustomTable';
import { FacilityData } from '../../services/constants/constants';

import { selectToken } from '../../services/controllers/common/UserSelector';

import facilityBanner from '../../common/assets/images/facility_bn.png';
import facilityBannerIcon from '../../common/assets/images/icon_facility.svg';

import './FacilityView.scss';

const FacilityView: React.FC = () => {
  const isLoggedIn = useSelector(selectToken) !== null;

  const areas = [
    '부산전체',
    '기장군',
    '금정구',
    '해운대구',
    '북구',
    '동래구',
    '연제구',
    '수영구',
    '부산진구',
    '사상구',
    '동구',
    '남구',
    '서구',
    '중구',
    '영도구',
    '사하구',
    '강서구',
  ];

  const renderDropdownItems = () => {
    return areas.map((item) => (
      <DropdownItem key={item} onClick={() => handleDropdownItemClick(item)} isSelected={area === item}>
        {item}
      </DropdownItem>
    ));
  };

  const [page, setPage] = useState(0);

  const [pageData, setPageData] = useState([]);
  const totalPageCount = 0;

  const handlePageChange = (page: number) => {
    setPage(page - 1);
  };

  const columns = [
    { dataId: 'placeholder', label: '' },
    { dataId: 'numbering', label: '번호' },
    { dataId: 'district', label: '행정구역' },
    { dataId: 'location', label: '지대종류' },
    { dataId: 'title', label: '시설명' },
    { dataId: 'dimension', label: '시설규모' },
    { dataId: 'img', label: '이미지' },
  ];

  const [area, setSelectedArea] = useState('부산');

  const handleDropdownItemClick = (itemText: string) => {
    const animationElement = document.querySelector(`.animation-g path#${itemText}`);
    console.log(animationElement);

    if (itemText !== area) {
      setSelectedArea(itemText);
    }
  };

  const handleMapClick = () => {
    const animationElements = document.querySelectorAll('.animation-g');

    animationElements.forEach((element) => {
      element.addEventListener('click', () => {
        const pathElement = element.querySelector('path');

        if (pathElement) {
          const clickedId = pathElement.id;

          const koreanForm = clickedId.replace(/\\u([\dA-Fa-f]{4})/g, (_, grp) => {
            return String.fromCharCode(parseInt(grp, 16));
          });

          animationElements.forEach((el) => {
            el.classList.remove('selected');
          });

          element.classList.add('selected');

          setSelectedArea(koreanForm);
        }
      });
    });
  };

  const handleDefaultButton = () => {
    setSelectedArea('부산');

    const animationElements = document.querySelectorAll('.animation-g');
    animationElements.forEach((element) => {
      element.classList.remove('selected');
    });
  };

  const [selectedItem, setSelectedItem] = useState<FacilityItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFacilityClick = (item: FacilityItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (isLoggedIn) {
    return (
      <div className="facility-view">
        <div className="facility-view__top">
          <div className="facility-view__image">
            <img src={facilityBanner} alt="facilityBanner" />
          </div>
          <div className="facility-view__content">
            <div className="facility-view__table-head">
              <div className="facility-view_title">
                <h2 className="gradual-color-transition">시설현황</h2>
              </div>
              <div className="facility-view__search-container">
                <div className="facility-view__search-area">
                  <TextInput dataId="" placeholder="시설명 검색" />
                  <Button
                    icon={ICONS.MAGNIFIER}
                    iconPlacement={ButtonIconPlacement.Left}
                    iconSize={IconSize.XL}
                    className="button--icon-text"
                  >
                    검색
                  </Button>
                </div>
              </div>
            </div>
            <CustomTable
              data={pageData}
              currentPage={page + 1}
              totalPageCount={totalPageCount}
              onPageChange={handlePageChange}
              columns={columns}
              showAdminActions={false}
              onRowClick={() => {}}
              disableRowClick={isLoggedIn}
              checkboxState={{}}
              onCheckboxChange={() => {}}
              className="facility-table"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="facility-view">
      <div className="facility-view__top">
        <div className="facility-view__image">
          <div className="facility-view__image__overlay" />
          <img src={facilityBanner} alt="facilityBG" />
          <div className="facility-view__image__icon">
            <svg className="responsive-svg">
              <image xlinkHref={facilityBannerIcon} />
            </svg>
            <p>깨끗한 바다 산을 위해 각 지역별 쓰레기 수거현황을 전합니다.</p>
          </div>
        </div>
        <div className="facility-view__content">
          <div className="facility-view__head">
            <div className="facility-view__title">
              <h2 className="gradual-color-transition">시설현황</h2>
            </div>
          </div>
          <div className="facility-view__body">
            <div className="facility-view__map-area">
              <button className={`button ${area === '부산' ? 'selected' : ''}`} onClick={handleDefaultButton}>
                부산 전체보기
              </button>
              <MyMap className="my-map" onClick={handleMapClick} />
            </div>
            <div className="facility-view__map-dropdown">
              <Dropdown elementAction={<button className="dropdown-button">{area || '부산전체'}</button>} dropdownClassName="dropdown">
                {renderDropdownItems()}
              </Dropdown>
            </div>
            <div className="facility-view__scroll">
              <div className="facility-view__scroll__title">
                <p>
                  <span>{area}</span> 수거사각지대
                </p>
              </div>
              <ul className="item-list">
                {FacilityData.filter((entry) => entry.district === area).length !== 0 ? (
                  FacilityData.filter((entry) => entry.district === area).map((item, _) => (
                    <li key={item.title} className="item" onClick={() => handleFacilityClick(item)}>
                      <div className="item-title">{item.title}</div>
                      <div className="item-content">
                        <img src={item.img} alt={item.title} />
                        <ul className="item-data">
                          <li>
                            <span className="icon-span" />
                            위치 : {item.location}
                          </li>
                          <li>
                            <span className="icon-span" />
                            규모 : {item.dimension}
                          </li>
                          <li className="item-status">
                            <span className="icon-span" />
                            쓰레기현황등급 : {item.status}
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>현재 사용 가능한 데이터가 없습니다.</p>
                )}
              </ul>
            </div>
            {selectedItem && <ItemModal facilityItem={selectedItem} isOpen={modalOpen} onClose={handleClose} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityView;

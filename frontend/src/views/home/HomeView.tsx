import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Card from '../../components/Card/Card';

import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import { DataItem } from '../../services/types/common';

import api from '../../services/apiServices';

import banner1 from '../../common/assets/images/home_bn1.png';
import banner2 from '../../common/assets/images/home_bn2.png';
import banner3 from '../../common/assets/images/home_bn3.png';
import banner1UW from '../../common/assets/images/home_bn1@x2.png';
import banner2UW from '../../common/assets/images/home_bn2@x2.png';
import banner3UW from '../../common/assets/images/home_bn3@x2.png';

import './HomeView.scss';

const Home: React.FC = () => {
  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 4;

  const { data: annResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('notice', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  const { data: contentResponse } = useQuery(['contentDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('content', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  const { data: labResponse } = useQuery(['labDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('living-lab', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  const { data: campaignResponse } = useQuery(['campaignDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('campaign', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  const { data: boardResponse } = useQuery(['boardDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('free-board', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  const banners = [
    { id: 1, imgSrc: banner1, imgUWSrc: banner1UW },
    { id: 2, imgSrc: banner2, imgUWSrc: banner2UW },
    { id: 3, imgSrc: banner3, imgUWSrc: banner3UW },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((currentBanner + 1) % banners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentBanner]);

  const displayItem = (pageType: string, itemId: string) => {
    window.location.pathname = `${pageType}/${itemId}`;
  };

  const goToPage = (pageType: string) => {
    window.location.pathname = `${pageType}`;
  };

  return (
    <div className="home-container">
      <div className="banner-container">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`banner-item ${index === currentBanner ? 'active' : ''}`}>
            <picture>
              <source media="(min-width: 1921px)" srcSet={banner.imgUWSrc} />
              <img src={banner.imgSrc} alt={`Home banner ${banner.id}`} />
            </picture>
          </div>
        ))}
        <div className="text-overlay">
          <h2>함께 하자,</h2>
          <h2>깨끗한 바다 부산으로!</h2>
          <p>깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고 있습니다.</p>
        </div>
      </div>
      <div className="h-screen" />
      <div className="context-container">
        <div className="home-body">
          <RevealOnScroll>
            <div className="announcement-container">
              <div className="announcement-title">
                <h2 className="gradual-color-transition">공지사항</h2>
                <button onClick={() => window.location.assign('announcement')}>
                  <Icon component={ICONS.PLUS} size={IconSize.XXL} />
                </button>
              </div>
              <div className="announcement-card">
                {annResponse?.list.map((item: DataItem) => (
                  <Card
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    date={item.updated_at}
                    onClick={() => displayItem('announcement', item.id)}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>
          <div className="highlights-container">
            <RevealOnScroll className="list-container">
              <div className="list-header">
                <h2 className="gradual-color-transition">콘텐츠</h2>
                <button onClick={() => window.location.assign('content')}>
                  <Icon component={ICONS.PLUS} size={IconSize.XXL} />
                </button>
              </div>
              <ul className="list-body">
                {contentResponse?.list.map((item: DataItem) => (
                  <li key={item.id} className="list-item" onClick={() => goToPage('content')}>
                    <div className="item-title">
                      <span className="icon-span" />
                      <span className="title-span">{item.title}</span>
                    </div>
                    <Icon component={ICONS.ARROW_RIGHT} />
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll className="list-container" style={{ transitionDelay: '0.25s' }}>
              <div className="list-header">
                <h2 className="gradual-color-transition">리빙랩</h2>
                <button onClick={() => window.location.assign('lab')}>
                  <Icon component={ICONS.PLUS} size={IconSize.XXL} />
                </button>
              </div>
              <ul className="list-body">
                {labResponse?.list.map((item: DataItem) => (
                  <li key={item.id} className="list-item" onClick={() => displayItem('lab', item.id)}>
                    <div className="item-title">
                      <span className="icon-span" />
                      <span className="title-span">{item.title}</span>
                    </div>
                    <Icon component={ICONS.ARROW_RIGHT} />
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll className="list-container" style={{ transitionDelay: '0.5s' }}>
              <div className="list-header">
                <h2 className="gradual-color-transition">캠페인</h2>
                <button onClick={() => window.location.assign('campaign')}>
                  <Icon component={ICONS.PLUS} size={IconSize.XXL} />
                </button>
              </div>
              <ul className="list-body">
                {campaignResponse?.list.map((item: DataItem) => (
                  <li key={item.id} className="list-item" onClick={() => displayItem('campaign', item.id)}>
                    <div className="item-title">
                      <span className="icon-span" />
                      <span className="title-span">{item.title}</span>
                    </div>
                    <Icon component={ICONS.ARROW_RIGHT} />
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll className="list-container" style={{ transitionDelay: '0.75s' }}>
              <div className="list-header">
                <h2 className="gradual-color-transition">자유게시판</h2>
                <button onClick={() => window.location.assign('board')}>
                  <Icon component={ICONS.PLUS} size={IconSize.XXL} />
                </button>
              </div>
              <ul className="list-body">
                {boardResponse?.list.map((item: DataItem) => (
                  <li key={item.id} className="list-item" onClick={() => displayItem('board', item.id)}>
                    <div className="item-title">
                      <span className="icon-span" />
                      <span className="title-span">{item.title}</span>
                    </div>
                    <Icon component={ICONS.ARROW_RIGHT} />
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

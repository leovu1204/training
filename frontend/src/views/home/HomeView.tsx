import React, { useState, useEffect } from 'react';

import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Card from '../../components/Card/Card';

import './HomeView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import api from '../../services/apiServices';
import { DataItem } from '../../services/types/common';

const Home: React.FC = () => {
  const [lists, setLists] = useState<{
    notice: DataItem[];
    content: DataItem[];
    'living-lab': DataItem[];
    campaign: DataItem[];
    'free-board': DataItem[];
  }>({
    notice: [],
    content: [],
    'living-lab': [],
    campaign: [],
    'free-board': [],
  });

  const listNames = Object.keys(lists);

  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 4;

  const banners = [
    { id: 1, imgSrc: '/home_bn1.png' },
    { id: 2, imgSrc: '/home_bn2.png' },
    { id: 3, imgSrc: '/home_bn3.png' },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((currentBanner + 1) % banners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentBanner]);

  useEffect(() => {
    const fetchDataForList = async (listName: string) => {
      try {
        const responseData = await api.data.fetchDataList(listName, {
          searchBy,
          searchValue,
          page,
          pageSize,
        });

        setLists((prevLists) => ({
          ...prevLists,
          [listName]: responseData.list,
        }));
      } catch (error) {
        console.error(`Error fetching ${listName} data:`, error);
      }
    };

    listNames.forEach((listName) => {
      fetchDataForList(listName);
    });
  }, [searchBy, searchValue, page, pageSize]);

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
            <img src={banner.imgSrc} alt={`Home banner ${banner.id}`} />
          </div>
        ))}
        <div className="text-overlay">
          <h2>함께 하자,</h2>
          <h2>깨끗한 바다 부산으로!</h2>
          <p>깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고 있습니다.</p>
        </div>
      </div>
      <div className="context-container">
        <RevealOnScroll>
          <div className="announcement-container">
            <div className="announcement-title">
              <h2 className="gradual-color-transition">공지사항</h2>
              <button onClick={() => window.location.assign('announcement')}>
                <Icon component={ICONS.PLUS} size={IconSize.XXL} />
              </button>
            </div>
            <div className="announcement-card">
              {lists.notice.map((item, _) => (
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
              {lists.content.map((item) => (
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
              {lists['living-lab'].map((item) => (
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
              {lists.campaign.map((item) => (
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
              {lists['free-board'].map((item) => (
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
  );
};

export default Home;

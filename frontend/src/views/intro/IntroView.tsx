import React, { useState, useEffect } from 'react';

import './IntroView.scss';

const Intro: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((element) => {
        if (isInViewport(element as HTMLElement)) {
          const key = (element.getAttribute('data-key') ?? 'defaultElement') as string;
          if (!visibleElements[key]) {
            setVisibleElements((prevVisibleElements) => ({
              ...prevVisibleElements,
              [key]: true,
            }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleElements]);

  return (
    <div className="intro-view">
      <div className="intro-view__top">
        <div className="intro-view__content">
          <div className={`intro-view__logo fade-in ${visibleElements.logo} ? 'active' : ''`} data-key="logo">
            <img
              src="/ocean (1).png"
              alt="Ocean"
              style={{
                marginBottom: 30,
              }}
            />
            <img
              src="logo.svg"
              alt="Logo"
              style={{
                marginBottom: 12.1,
              }}
            />
            <span className="intro-view__logo__span">안녕하십니까. 깨끗한 바다 부산 홈페이지 방문을 환영합니다.</span>
          </div>
          <div className={`intro-view__paragraph-1 fade-in ${visibleElements.paragraph1} ? 'active' : ''`} data-key="paragraph1">
            <p>
              제2 수도로 불리는 부산은 동남권에는 바다가, 북서로는 낙동강이 흐르고 있는 <span className="span-blue">친수도시</span>로 지리적
              이점과 풍부한 해양자원을 바탕으로
            </p>
            <p>
              <span className="span-blue">항만물류, 해양수산, 관광·MICE산업</span> 등 고부가가치 산업기반의
              <span className="span-blue">글로벌 해양도시</span>로 나아가고 있습니다.
            </p>
          </div>
          <div className={`intro-view__image-1 fade-in ${visibleElements.image1} ? 'active' : ''`} data-key="image1">
            <img src="about_1.svg" alt="Process" />
          </div>
          <div className={`intro-view__paragraph-2  fade-in ${visibleElements.paragraph2} ? 'active' : ''`} data-key="paragraph2">
            <p>
              그러나 <span className="span-black">낙동강 하류와 근해에 밀려오는 막대한 양의 해양쓰레기</span>로 인해 환경오염, 생태계 파괴,
              미세플라스틱 문제 등 <span className="span-black">부산의 해양자원과 시민의 안전이 위협</span>받고 있습니다.
            </p>
            <p>이에 부산광역시는 시민단체와 다양한 환경 정화 활동을 통해 해마다 50만 톤에 달하는 해양쓰레기를 수거하고 있지만</p>
            <p>
              <span className="span-black">안전한 접근이 보장되지 않는 테트라포드와 습지의 경우 여전히 수거 사각지대로</span>남아 있습니다.
            </p>
          </div>
          <div className={`intro-view__paragraph-3 fade-in ${visibleElements.paragraph3} ? 'active' : ''`} data-key="paragraph3">
            <p>
              <span className="span-black">‘</span>
              <span className="span-blue">깨바부</span>
              <span className="span-black">(</span>
              <span className="span-blue">깨</span>
              <span className="span-black">끗한</span>
              <span className="span-blue">바</span>
              <span className="span-black">다</span>
              <span className="span-blue">부</span>
              <span className="span-black">산)’</span>는 이러한 지역현안 문제 해결을 위해
              <span className="span-blue">부산지역 내 수거 사각지대인 테트라포트(72개소)와 습지(1개소) 현황 정보를 제공</span>하고
            </p>
            <p>
              <span className="span-blue">해양쓰레기 문제의 심각성을 인지할 수 있는 콘텐츠를 게시</span> 함으로써 깨끗한 바다·강 만들기
              문화를 홍보하고 확산하고자 합니다.
            </p>
            <p>또한, 수거 사각지대의 쓰레기 문제의 해결방안에 대해 주민들과 자유롭게 논의하고 공감하기 위하여</p>
            <p>
              <span className="span-blue">시민의 의견을 상시 수집할 수 있는 자유게시판을 운영</span>
              하여 시민의 소리에 귀 기울이겠습니다.
            </p>
          </div>
          <div className={`intro-view__image-2 fade-in ${visibleElements.image2} ? 'active' : ''`} data-key="image2">
            <img src="about_2.svg" alt="Cards" />
          </div>
          <div className={`intro-view__paragraph-4 fade-in ${visibleElements.paragraph4} ? 'active' : ''`} data-key="paragraph4">
            <p>아름다운 미래 해양도시 부산을 위하여 시민 여러분들의 많은 관심과 참여를 부탁드립니다. 감사합니다.</p>
          </div>
          <div className={`intro-view__paragraph-5 fade-in ${visibleElements.paragraph5} ? 'active' : ''`} data-key="paragraph5">
            <p>
              본 사이트는 과학기술정보통신부에서 시행하는 원천기술개발사업-국민공감·국민참여 R&SD 선도사업-주민공감 현장문제해결사업과
              부산광역시의 지원을 받아 제작되었습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;

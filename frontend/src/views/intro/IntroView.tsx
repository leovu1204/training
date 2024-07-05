import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';

import oceanIcon from '../../common/assets/images/ocean (1).png';
import logo from '../../common/assets/images/logo.svg';
import about1 from '../../common/assets/images/about1.svg';
import about1Vert from '../../common/assets/images/about1_vertical.svg';
import about2 from '../../common/assets/images/about2.svg';
import about2Vert from '../../common/assets/images/about2_vertical.svg';

import './IntroView.scss';

const Intro: React.FC = () => {
  return (
    <div className="intro-view">
      <div className="intro-view__top">
        <div className="intro-view__content">
          <RevealOnScroll>
            <div className="intro-view__logo">
              <img
                src={oceanIcon}
                alt="Ocean"
                style={{
                  marginBottom: 30,
                }}
              />
              <img
                src={logo}
                alt="Logo"
                style={{
                  marginBottom: 12.1,
                }}
              />
              <span className="intro-view__logo__span">안녕하십니까. 깨끗한 바다 부산 홈페이지 방문을 환영합니다.</span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="intro-view__paragraph-1">
              <p>
                제2 수도로 불리는 부산은 동남권에는 바다가, 북서로는 낙동강이 흐르고 있는 <span className="span-blue">친수도시</span>로
                지리적 이점과 풍부한 해양자원을 바탕으로
                <span className="span-blue">항만물류, 해양수산, 관광·MICE산업</span> 등 고부가가치 산업기반의
                <span className="span-blue">글로벌 해양도시</span>로 나아가고 있습니다.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <picture className="intro-view__image-1">
              <source media="(max-width: 767px)" srcSet={about1Vert} className="responsive-svg" />
              <img src={about1} alt="Process 1" className="responsive-svg" />
            </picture>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="intro-view__paragraph-2">
              <p>
                그러나 <span className="span-black">낙동강 하류와 근해에 밀려오는 막대한 양의 해양쓰레기</span>로 인해 환경오염, 생태계
                파괴, 미세플라스틱 문제 등 <span className="span-black">부산의 해양자원과 시민의 안전이 위협</span>받고 있습니다.
              </p>
              <p>이에 부산광역시는 시민단체와 다양한 환경 정화 활동을 통해 해마다 50만 톤에 달하는 해양쓰레기를 수거하고 있지만</p>
              <p>
                <span className="span-black">안전한 접근이 보장되지 않는 테트라포드와 습지의 경우 여전히 수거 사각지대로</span>남아
                있습니다.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="intro-view__paragraph-3">
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
          </RevealOnScroll>
          <RevealOnScroll>
            <picture className="intro-view__image-2">
              <source media="(max-width: 767px)" srcSet={about2Vert} />
              <img src={about2} alt="Process 2" />
            </picture>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="intro-view__paragraph-4">
              <p>아름다운 미래 해양도시 부산을 위하여 시민 여러분들의 많은 관심과 참여를 부탁드립니다. 감사합니다.</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="intro-view__paragraph-5">
              <p>
                본 사이트는 과학기술정보통신부에서 시행하는 원천기술개발사업-국민공감·국민참여 R&SD 선도사업-주민공감 현장문제해결사업과
                부산광역시의 지원을 받아 제작되었습니다.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Intro;

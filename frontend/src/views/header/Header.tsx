import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';

import { routes } from '../../common/utils/routes';
import { storage } from '../../common/utils/storage';

import './Header.scss';

interface NavLinkProps {
  to: string;
  text: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const Header: React.FC<{ isLoggedIn: boolean; isAdmin: boolean }> = ({ isLoggedIn, isAdmin }) => {
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 200) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const CustomNavLink: React.FC<NavLinkProps> = ({ to, text, children, onClick }) => {
    return (
      <NavLink
        to={to}
        className={(navData) => (navData.isActive ? 'active-link' : 'default-link')}
        onClick={(e) => {
          setIsMenuOpen(false);
          if (onClick) onClick(e);
        }}
      >
        {text}
        {children}
      </NavLink>
    );
  };

  const location = useLocation();
  const currentPath = location.pathname;

  const showLinks = currentPath !== '/login' && currentPath !== '/register';
  const isHomePage = currentPath === '/';

  const headerClasses = `app-header ${isMenuOpen ? 'show-menu' : ''} ${!showLinks ? 'hide-links' : ''} ${
    isHomePage && isTransparent ? 'transparent' : ''
  } ${isLoggedIn ? (isAdmin ? 'admin' : 'user') : ''}`;

  const [isSmallerScreen, setIsSmallerScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) setIsSmallerScreen(true);
    else setIsSmallerScreen(false);
    if (window.innerWidth <= 1200) setIsMediumScreen(true);
    else setIsMediumScreen(false);

    return () => {};
  }, [window.innerWidth]);

  return (
    <header className={headerClasses}>
      <div className="header-left">
        <NavLink to="/" className={`header-img ${isSmallerScreen ? 'small-screen' : ''}`} />
        {!showLinks || (isLoggedIn && <div className="header-img-text">{isAdmin ? <p>[ 관리자 ]</p> : <p>[ 리빙랩 관리자 ]</p>}</div>)}
      </div>
      {showLinks && (
        <div className="header-right">
          <div className="menu-container" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon className="menu-icon" component={isMenuOpen ? ICONS.CLOSE : ICONS.MENU} size={isMenuOpen ? IconSize.LG : IconSize.XL} />
          </div>
          <nav className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
            {!isLoggedIn && (
              <>
                <CustomNavLink to="/" text="홈" />
                <CustomNavLink to="/intro" text="소개" />
              </>
            )}
            {isAdmin || !isLoggedIn ? (
              <>
                <CustomNavLink to="/announcement" text="공지사항" />
                <CustomNavLink to="/facility" text="시설현황" />
                <CustomNavLink to="/content" text="콘텐츠" />
              </>
            ) : null}

            {!isLoggedIn && <CustomNavLink to="/lab" text="리빙랩" />}
            {isAdmin && !isMediumScreen && (
              <Dropdown
                elementAction={
                  <CustomNavLink
                    to="/lab"
                    text="리빙랩"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                }
              >
                <DropdownItem onClick={() => window.location.assign('/lab')}>게시글 관리</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    window.location.assign('/user-management');
                  }}
                >
                  회원 관리
                </DropdownItem>
              </Dropdown>
            )}
            {isAdmin && isMediumScreen && (
              <>
                <CustomNavLink to="/lab" text="리빙랩" />
                <CustomNavLink to="/user-management" text="회원 관리" />
              </>
            )}
            {isAdmin || !isLoggedIn ? (
              <>
                <CustomNavLink to="/campaign" text="캠페인" />
                <CustomNavLink to="/board" text="자유게시판" />
              </>
            ) : null}

            {isLoggedIn && (
              <CustomNavLink
                to="/login"
                text="로그아웃"
                onClick={() => {
                  storage.removeToken();
                  window.location.pathname = routes.LOGIN;
                }}
              />
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

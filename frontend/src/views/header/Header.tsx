import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';

import { routes } from '../../common/utils/routes';
import { storage } from '../../common/utils/storage';
import { selectUserRole, selectToken } from '../../services/controllers/common/UserSelector';
import { logout } from '../../services/controllers/common/UserSlice';

import headerLogo from '../../common/assets/images/logo_medium.svg';

import './Header.scss';

interface NavLinkProps {
  to: string;
  text: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectToken) !== null;

  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = document.querySelector('.container')?.scrollTop;
      if (scrollPosition)
        if (scrollPosition < 150) {
          setIsTransparent(true);
        } else {
          setIsTransparent(false);
        }
    };

    document.querySelector('.container')?.addEventListener('scroll', handleScroll);

    return () => {
      document.querySelector('.container')?.removeEventListener('scroll', handleScroll);
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
  const isAdmin = useSelector(selectUserRole) === 'Admin';

  const headerClasses = `app-header ${isMenuOpen ? 'show-menu' : ''} ${!showLinks ? 'hide-links' : ''} ${
    isHomePage && (isTransparent ? 'transparent' : 'nav-fade-in')
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
        <svg
          className={`header-logo ${isSmallerScreen ? 'small-screen' : ''}`}
          onClick={() => {
            if (window.location.pathname !== '/') window.location.assign('/');
          }}
        >
          <image xlinkHref={headerLogo} />
        </svg>
        {!showLinks || (isLoggedIn && <div className="header-img-text">{isAdmin ? <p>[ 관리자 ]</p> : <p>[ 리빙랩 관리자 ]</p>}</div>)}
      </div>
      {showLinks && (
        <div className="header-right">
          <div className="menu-container" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon className="menu-icon" component={isMenuOpen ? ICONS.CLOSE : ICONS.MENU} size={IconSize.LG} />
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
                  dispatch(logout());
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

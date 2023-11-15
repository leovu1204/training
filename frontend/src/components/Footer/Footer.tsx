import React from 'react';

import './Footer.scss';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="footer__left">
        <img src="/footer.svg" alt="footerLogo" />
      </div>
      <div className="footer__right">
        <div className="footer__right__contact">
          <p>47430 부산광역시 부산진구 엄광로 176</p>
          <span />
          <p>TEL. 051-890-1754</p>
          <span />
          <p>FAX. 051-890-1759</p>
        </div>
        <p>COPYRIGHT 2023 DONG-EUI UNIVERSITY. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;

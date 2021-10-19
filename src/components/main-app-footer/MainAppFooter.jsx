import React from 'react';
import Logo from '../../common/logo/Logo';
import facebookImg from '../../assets/imgs/icons/facebook.png';
import twitterImg from '../../assets/imgs/icons/twitter.png';
import whatsappImg from '../../assets/imgs/icons/whatsapp.png';

import './MainAppFooter.scss';

const MainAppFooter = () => {
  return (
    <footer className="main-app-footer">
      <div className="custom-container">
        <div className="footer-content">
          <Logo className="footer-logo" />
          <p>جميع الحقوق محفوظة © 2021 سوق الكنترول</p>
          <ul className="footer-social-links">
            <li>
              <a href="https://facebook.com">
                <img src={facebookImg} alt="facebook" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com">
                <img src={twitterImg} alt="twitter" />
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${'0109914134'}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={whatsappImg} alt="whatsapp" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default MainAppFooter;

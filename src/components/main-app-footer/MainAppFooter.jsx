/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Logo from '../../common/logo/Logo';
import facebookImg from '../../assets/imgs/icons/facebook.png';
import twitterImg from '../../assets/imgs/icons/twitter.png';
import instagramImg from '../../assets/imgs/icons/instagram.png';
import youtubeImg from '../../assets/imgs/icons/youtube.png';
import emailImg from '../../assets/imgs/icons/mail.png';
import './MainAppFooter.scss';
import GeneralSettingsContext from '../../contexts/general-settings-context/GeneralSettingsContext';

const MainAppFooter = () => {
  const { fetchedGeneralSettings } = useContext(GeneralSettingsContext);

  return (
    <footer className="main-app-footer">
      <div className="custom-container">
        <div className="footer-content">
          <Logo className="footer-logo" />
          <p>جميع الحقوق محفوظة © 2023 سوق الكنترول</p>
          <ul className="footer-social-links">
            {fetchedGeneralSettings?.facebook && (
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={fetchedGeneralSettings.facebook}
                >
                  <img src={facebookImg} alt="facebook" />
                </a>
              </li>
            )}
            {fetchedGeneralSettings?.twitter && (
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={fetchedGeneralSettings.twitter}
                >
                  <img src={twitterImg} alt="twitter" />
                </a>
              </li>
            )}
            {fetchedGeneralSettings?.instagram && (
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={fetchedGeneralSettings.instagram}
                >
                  <img src={instagramImg} alt="instagram" />
                </a>
              </li>
            )}
            {fetchedGeneralSettings?.youtube && (
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={fetchedGeneralSettings.youtube}
                >
                  <img src={youtubeImg} alt="youtube" />
                </a>
              </li>
            )}
            {fetchedGeneralSettings?.email && (
              <li>
                <a
                  target="_blank"
                  href={'mailto:' + fetchedGeneralSettings.email}
                  rel="noreferrer"
                >
                  <img src={emailImg} alt="email" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default MainAppFooter;

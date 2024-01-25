/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import facebookImg from '../../assets/imgs/icons/facebook.png';
import instagramImg from '../../assets/imgs/icons/instagram.png';
import emailImg from '../../assets/imgs/icons/mail.png';
import twitterImg from '../../assets/imgs/icons/twitter.png';
import youtubeImg from '../../assets/imgs/icons/youtube.png';
import img1 from '../../assets/imgs/partners/1.png';
import img2 from '../../assets/imgs/partners/2.png';
import img3 from '../../assets/imgs/partners/3.png';
import img4 from '../../assets/imgs/partners/4.png';
import CustomImage from '../../common/custom-image/CustomImage';
import Logo from '../../common/logo/Logo';
import GeneralSettingsContext from '../../contexts/general-settings-context/GeneralSettingsContext';
import './MainAppFooter.scss';

const MainAppFooter = () => {
  const { fetchedGeneralSettings } = useContext(GeneralSettingsContext);

  return (
    <footer className="main-app-footer">
      <div className="custom-container">
        <div className="footer-content">
          <Logo colored className="footer-logo" />
          <div className="footer-middle">
            <p>جميع الحقوق محفوظة © 2023 سوق الكنترول</p>
            <div className="partners-list">
              <CustomImage className="p-img" src={img1} />
              <CustomImage className="p-img" src={img2} />
              <CustomImage className="p-img" src={img3} />
              <CustomImage className="p-img" src={img4} />
            </div>
          </div>
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

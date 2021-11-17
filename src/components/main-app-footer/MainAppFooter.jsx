/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Logo from '../../common/logo/Logo';
import facebookImg from '../../assets/imgs/icons/facebook.png';
import twitterImg from '../../assets/imgs/icons/twitter.png';
import instagramImg from '../../assets/imgs/icons/instagram.png';
import youtubeImg from '../../assets/imgs/icons/youtube.png';
import emailImg from '../../assets/imgs/icons/mail.png';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import getAboutUsApi from '../../apis/homepage/aboutUsApi';
import checkRes from '../../utils/checkRes';
import { useTranslation } from 'react-i18next';
import './MainAppFooter.scss';

const MainAppFooter = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchedData, setFetchedData] = React.useState(null);
  const customApiRequest = useCustomApiRequest();

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoading(true);
      customApiRequest(
        getAboutUsApi(i18n.language),

        (res) => {
          setIsLoading(false);
          if (checkRes(res) && res?.data?.data) {
            setFetchedData(res.data.data);
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  return (
    <footer className="main-app-footer">
      <div className="custom-container">
        <div className="footer-content">
          <Logo className="footer-logo" />
          <p>جميع الحقوق محفوظة © 2021 سوق الكنترول</p>
          <ul className="footer-social-links">
            {fetchedData?.facebook && (
              <li>
                <a target="_blank" rel="noreferrer" href={fetchedData.facebook}>
                  <img src={facebookImg} alt="facebook" />
                </a>
              </li>
            )}
            {fetchedData?.twitter && (
              <li>
                <a target="_blank" rel="noreferrer" href={fetchedData.twitter}>
                  <img src={twitterImg} alt="twitter" />
                </a>
              </li>
            )}
            {fetchedData?.instagram && (
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={fetchedData.instagram}
                >
                  <img src={instagramImg} alt="instagram" />
                </a>
              </li>
            )}
            {fetchedData?.youtube && (
              <li>
                <a target="_blank" rel="noreferrer" href={fetchedData.youtube}>
                  <img src={youtubeImg} alt="youtube" />
                </a>
              </li>
            )}
            {fetchedData?.email && (
              <li>
                <a
                  target="_blank"
                  href={'mailto:' + fetchedData.email}
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

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import Loading from './common/loading/Loading';
import { ContactSellerProvider } from './contexts/contact-seller-context/ContactSellerContext';
import { UserProvider } from './contexts/user-context/UserProvider';
import { MainAppBarProvider } from './contexts/main-app-bar-context/MainAppBarProvider';
//
import 'react-circular-progressbar/dist/styles.css';
// import 'slick-carousel/slick/slick-theme.css';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'antd/dist/antd.less';
import 'aos/dist/aos.css';
import 'react-phone-number-input/style.css';
import './scss/index.scss';
import 'slick-carousel/slick/slick.css';
import { GeneralSettingsProvider } from './contexts/general-settings-context/GeneralSettingsContext';

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <GeneralSettingsProvider>
      <UserProvider>
        <MainAppBarProvider>
          <ContactSellerProvider>
            <Router>
              <App />
            </Router>
          </ContactSellerProvider>
        </MainAppBarProvider>
      </UserProvider>
    </GeneralSettingsProvider>
  </Suspense>,
  document.getElementById('root')
);

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';
import Loading from '../../common/loading/Loading';
import Routes from './Routes';
import AppLayout from './Layout';
import { useEffect } from 'react';
import axios from 'axios';
import { ConfigProvider } from 'antd';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import ReactNotification from 'react-notifications-component';
import DocTitleScrollTop from '../../utils/DocTitleScrollTop';
import '../../i18n';
import UserContext from '../../contexts/user-context/UserProvider';
import myInfoApi from '../../apis/auth/myInfoApi';
import checkRes from '../../utils/checkRes';
import routerLinks from './routerLinks';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import FawryPay from '../../utils/fawrypay-payments';

// axios.defaults.baseURL = 'http://compound.emir.life/api';
axios.defaults.baseURL = 'https://ecusouq.com/backend/api';

function App() {
  const { i18n } = useTranslation();
  const history = useHistory();
  const { user, removeCurrentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);

  useEffect(() => {
    AOS.init({
      duration: 1500
    });
  }, []);
  DocTitleScrollTop('');

  const customApiRequest = useCustomApiRequest();

  useEffect(() => {
    let isMounted = true;
    if (user && isMounted) {
      customApiRequest(
        myInfoApi(user?.token, i18n.language),
        (res) => {
          if (checkRes) {
            setCurrentUser({
              ...res?.data?.data,
              token: user?.token
            });
          } else {
            removeCurrentUser();
            history.push(routerLinks.signinPage);
          }
        },
        (error) => {}
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);

  function buildChargeRequest() {
    const chargeRequest = {
      merchantCode: '1tSa6uxz2nRbgY+b+cZGyA==',
      merchantRefNum: '2312465464',
      customerMobile: '01xxxxxxxxx',
      customerEmail: 'email@domain.com',
      customerName: 'Customer Name',
      customerProfileId: '1212',
      paymentExpiry: '1631138400000',
      chargeItems: [
        {
          itemId: '6b5fdea340e31b3b0339d4d4ae5',
          description: 'Product Description',
          price: 50.0,
          quantity: 2,
          imageUrl: 'https://your-site-link.com/photos/45566.jpg'
        },
        {
          itemId: '97092dd9e9c07888c7eef36',
          description: 'Product Description',
          price: 75.25,
          quantity: 3,
          imageUrl: 'https://your-site-link.com/photos/639855.jpg'
        }
      ],
      returnUrl: 'https://your-site-link.com',
      authCaptureModePayment: false,
      signature:
        '2ca4c078ab0d4c50ba90e31b3b0339d4d4ae5b32f97092dd9e9c07888c7eef36'
    };
    return chargeRequest;
  }

  function checkout() {
    console.log('che');
    const configuration = {
      locale: 'en', //default en
      mode: 'POPUP' //required, allowed values [POPUP, INSIDE_PAGE, SIDE_PAGE]
    };
    FawryPay.checkout(buildChargeRequest(), configuration);
  }

  return (
    <div className={`app app-${i18n.dir()}`}>
      <Suspense fallback={<Loading />}>
        <ConfigProvider direction={i18n.dir()}>
          <ReactNotification className={i18n.dir()} />
          <Switch>
            <AppLayout>
              <Routes />

              <input
                type="image"
                onClick={() => checkout()}
                src="https://www.atfawry.com/assets/img/FawryPayLogo.jpg"
                alt="pay-using-fawry"
                id="fawry-payment-btn"
              />
            </AppLayout>

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </ConfigProvider>
      </Suspense>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import contactImg from '../../assets/imgs/contact/contact-img.png';
import phoneImg from '../../assets/imgs/contact/smart-phone.png';
import facebookImg from '../../assets/imgs/contact/facebook.png';
import emailImg from '../../assets/imgs/contact/email.png';
import whatsAppImg from '../../assets/imgs/contact/whatsapp.png';
import './ContactUsPage.scss';
import Map from '../../components/map/Map';
import { useTranslation } from 'react-i18next';
import getAllContactsApi from '../../apis/contacts/getAllContactsInfoApi';
import checkRes from '../../utils/checkRes';
import { Spin } from 'antd';

const ContactUsPage = () => {
  const { i18n } = useTranslation();
  const [selectedLocation, setSelecectedLocation] = useState({
    lat: '',
    lng: ''
  });
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactsData, setContactsData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getAllContactsApi(i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data;
            setContactsData(data);
            if (data?.lat && data.lng) {
              setSelecectedLocation({
                lat: parseFloat(data.lat),
                lng: parseFloat(data.lng)
              });
            }
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 332
        }}
      >
        <Spin />
      </div>
    );
  } else if (contactsData)
    return (
      <div className="contact-us-page shared-custom-page">
        <div className="custom-container">
          {/* <h1 className="page-main-title">تـــواصــــل معنــــا</h1> */}

          <div className="contact-boxs-wrap">
            <ul className="boxs-ul">
              {contactsData?.phone && (
                <li data-aos="fade-up" data-aos-duration="600">
                  <div className="li-content">
                    <div className="li-img">
                      <img src={phoneImg} alt="phone" />
                    </div>
                    <div className="li-title">رقـــم الهاتف</div>
                    <div className="li-value">{contactsData.phone}</div>
                  </div>
                </li>
              )}
              {contactsData?.email && (
                <li
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="200"
                >
                  <div className="li-content">
                    <div className="li-img">
                      <img src={emailImg} alt="email" />
                    </div>
                    <div className="li-title">البريد الاكترونى</div>
                    <div className="li-value">{contactsData.email}</div>
                  </div>
                </li>
              )}
              {contactsData?.facebook && (
                <li
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="400"
                >
                  <div className="li-content">
                    <div className="li-img">
                      <img src={facebookImg} alt="facebook" />
                    </div>
                    <div className="li-title">حساب الفيسبوك</div>
                    <div className="li-value">{contactsData.facebook}</div>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="contact-text-img-wrap" data-aos="fade-up">
            <div className="text-wrap">
              <div className="text-wrap-title">
                هل تريد الاستفسار عن عقار معين ؟
              </div>
              <div className="text-itself">
                {parse(contactsData?.description)}
                <div className="whats-app-link-wrap">
                  اضغط هنا :
                  <a
                    href={`https://wa.me/${contactsData?.phone}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={whatsAppImg} alt="whats app" />
                    <span>رابط الواتساب</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="img-wrap">
              <img src={contactImg} alt="conatct us" />
            </div>
          </div>

          <div className="map-section-wrap">
            <Map
              width="100%"
              height="400px"
              selectedLocation={selectedLocation}
              setSelecectedLocation={setSelecectedLocation}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </div>
        </div>
      </div>
    );
  return null;
};

export default ContactUsPage;

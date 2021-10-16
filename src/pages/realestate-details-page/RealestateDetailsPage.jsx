import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import Map from '../../components/map/Map';
import { useTranslation } from 'react-i18next';
import checkRes from '../../utils/checkRes';
import { Spin } from 'antd';
import getSingleRealestateApi from '../../apis/realestates-apis/getSingleRealestateApi';
import SharedSlider from '../../components/shared-slider/SharedSlider';
import bedroomIcon from '../../assets/imgs/icons/bed-room-icon.png';
import restRoomIcon from '../../assets/imgs/icons/rest-room-icon.png';
import { PushpinOutlined } from '@ant-design/icons';
import './RealestateDetailsPage.scss';
import CustomImage from '../../common/custom-image/CustomImage';

const RealestateDetailsPage = () => {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const [selectedLocation, setSelecectedLocation] = useState({
    lat: '',
    lng: ''
  });
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [realestateDetails, setRealestateDetails] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getSingleRealestateApi(id, i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data;
            setRealestateDetails(data);
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
  }, [i18n.language, id]);

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
  } else if (realestateDetails)
    return (
      <div className="realestate-details-page shared-custom-page">
        <div className="custom-container">
          <div style={{ backgroundColor: '#fff', paddingBottom: 32 }}>
            <div className="custom-container">
              <SharedSlider
                slides={realestateDetails?.images}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="real-estate-data">
            <div className="title-desc-features" data-aos="fade-left">
              <div className="title-desc">
                {realestateDetails?.title && (
                  <div className="title">{realestateDetails.title}</div>
                )}
                {realestateDetails?.address && (
                  <div className="details-address">
                    <PushpinOutlined />
                    {realestateDetails.address}
                  </div>
                )}
                <div className="extra-row">
                  <div className="bedrooms">
                    <div className="rooms-title">
                      <img src={bedroomIcon} alt="bedroom" />
                      غرف النوم
                    </div>
                    <div className="rooms-value">
                      ( {realestateDetails.rooms} )
                    </div>
                  </div>
                  <div className="restrooms">
                    <div className="rooms-title">
                      <img src={restRoomIcon} alt="restroom" />
                      حمام
                    </div>
                    <div className="rooms-value">
                      ( {realestateDetails.bathrooms} )
                    </div>
                  </div>
                </div>
                {realestateDetails?.description && (
                  <div className="description">
                    {parse(realestateDetails.description)}
                  </div>
                )}
              </div>

              <div className="features-wrap">
                {realestateDetails?.features && (
                  <div className="features-data">
                    {parse(realestateDetails.features)}
                  </div>
                )}
              </div>
            </div>
            <div className="main-img-wrap" data-aos="fade">
              <CustomImage src={realestateDetails?.image} />
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

export default RealestateDetailsPage;

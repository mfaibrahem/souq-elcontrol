import React, { useState, useEffect } from 'react';
import { ForwardFilled } from '@ant-design/icons';
import parse from 'html-react-parser';
import videoImg2 from '../../assets/imgs/video-section/video-img2.png';

import './VideoSection.scss';
import { Modal, Spin } from 'antd';
import checkRes from '../../utils/checkRes';
import getHomepageVideoApi from '../../apis/homepage/getHomepageVideoApi';
import { useTranslation } from 'react-i18next';
import CustomImage from '../../common/custom-image/CustomImage';

const VideoSection = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getHomepageVideoApi(i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data;
            setVideoData(data);
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
  }

  if (videoData)
    return (
      <div className="custom-container">
        <section className="home-video-section" data-aos="fade">
          <div className="section-wrapper">
            <CustomImage src={videoData.image} alt="video" />

            {/* <img className="video-play-icon" src={videoPlayIcon} alt="play icon" /> */}
            <div
              className={`video-play-icon ${modalOpened ? 'modal-opened' : ''}`}
              onClick={() => setModalOpened(true)}
            >
              <ForwardFilled />
            </div>
            <div className="text-box-wrap">
              {videoData?.article ? (
                parse(videoData.article)
              ) : (
                <p>
                  بعض من الأنجازات اللي حققتها دار الفرحة في الفترة الأخيرة من
                  عقارات لديكور للاستثمارات ودة فديو بيوضح بعض الاعمال
                </p>
              )}
              <img src={videoImg2} alt="box" />
            </div>
          </div>
        </section>

        {videoData?.video && (
          <Modal
            transitionName=""
            className="shared-custom-modal order-delegates-modal"
            width="90%"
            style={{ maxWidth: '842px' }}
            title={
              <div className="modal-title">
                بعض من الأنجازات اللي حققتها دار الفرحة
              </div>
            }
            visible={modalOpened}
            onOk={() => {
              setModalOpened(false);
              // setSelectedOrder(null);
            }}
            onCancel={() => {
              setModalOpened(false);
              // setSelectedOrder(null);
            }}
            footer={false}
          >
            <div
              style={{
                display: 'grid'
              }}
            >
              <iframe
                style={{
                  margin: 'auto',
                  width: '96%',
                  minHeight: '332px',
                  borderRadius: '8px'
                }}
                src={`https://www.youtube.com/embed/${
                  videoData.video.trim().split('/')[
                    videoData.video.trim().split('/').length - 1
                  ]
                }`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Modal>
        )}
      </div>
    );
  return null;
};

export default VideoSection;

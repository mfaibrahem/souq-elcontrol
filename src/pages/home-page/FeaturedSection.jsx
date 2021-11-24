import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import featuredImg from '../../assets/imgs/featured-img.png';
import CustomImage from '../../common/custom-image/CustomImage';
import checkRes from '../../utils/checkRes';
import './FeaturedSection.scss';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const featuredArr = [
  {
    id: 1,
    name: 'بها مميزات كثيرة',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    image: featuredImg
  },
  {
    id: 2,
    name: 'بها مميزات كثيرة',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    image: featuredImg
  },
  {
    id: 3,
    name: 'بها مميزات كثيرة',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    image: featuredImg
  },
  {
    id: 4,
    name: 'بها مميزات كثيرة',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    image: featuredImg
  },
  {
    id: 5,
    name: 'بها مميزات كثيرة',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    image: featuredImg
  },
  {
    id: 6,
    name: 'بها مميزات كثيرة',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى',
    image: featuredImg
  }
];
const FeaturedSection = () => {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let res;
        await sleep(400);
        setFetchedData(featuredArr);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data;
            if (data) setFetchedData(data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  const renderFeaturedUl = () => {
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
          <LoadingOutlined style={{ fontSize: 20 }} />
        </div>
      );
    }

    if (fetchedData?.length === 0) return 'No found categories';
    else if (fetchedData?.length > 0) {
      return (
        <ul className="featured-ul">
          {fetchedData.map((ele) => {
            return (
              <li key={ele.id} className="featured-li">
                <div className="li-content">
                  <div className="featured-img">
                    <CustomImage src={ele?.image} />
                  </div>
                  <div className="featured-name">{ele?.name}</div>
                  <div className="featured-desc">{ele?.desc}</div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <section className="featured-section">
      <div className="custom-container">
        <div className="main-title">{t('featured_section.main_title')}</div>

        {renderFeaturedUl()}
      </div>
    </section>
  );
};

export default FeaturedSection;

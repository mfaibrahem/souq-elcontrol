/* eslint-disable eqeqeq */
import React from 'react';
import CategoriesCard from './CategoriesCard';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import './CategoriesSection.scss';
import routerLinks from '../app/routerLinks';
import { useParams } from 'react-router-dom';
import servicesRouterLinks from '../app/services-routes/servicesRouterLinks';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CategoriesSection = ({
  isLoading,
  cats,
  sectionTitle,
  isMainCat = true,
  isSubCat = false
}) => {
  const params = useParams();
  const { t } = useTranslation();
  // const [fetchedData, setFetchedData] = useState([]);
  const getUrl = (card) => {
    if (params?.categoryId == 58) {
      // "قطع غيار جديد و استعمال الخارج"
      return routerLinks?.subCategoriesRoute(card?.id);
    } else if (params?.categoryId == 16) {
      return servicesRouterLinks?.postsRoute(params?.categoryId, card?.id);
    } else if (card?.id == 10) {
      return servicesRouterLinks?.cities(card?.id);
    }
  };
  const renderCategoriesUl = () => {
    if (cats?.length === 0) return <Empty description="No categories found" />;
    else if (cats?.length > 0) {
      return (
        <ul className="categories-ul">
          {cats.map((ele) => {
            return (
              <CategoriesCard
                isMainCat={isMainCat}
                isSubCat={isSubCat}
                key={ele.id}
                {...ele}
                url={getUrl(ele) || ''}
              />
            );
          })}
        </ul>
      );
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: 300,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <LoadingOutlined style={{ fontSize: 20 }} />
      </div>
    );
  }

  if (cats) {
    return (
      <section className="categories-section">
        <div className="custom-container">
          {!sectionTitle && (
            <p className="main-title">{t('categories_section.main_title')}</p>
          )}
          {renderCategoriesUl()}
        </div>
      </section>
    );
  }
  return null;
};

export default CategoriesSection;

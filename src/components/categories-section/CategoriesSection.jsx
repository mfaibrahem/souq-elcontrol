import React from 'react';
import CategoriesCard from './CategoriesCard';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import './CategoriesSection.scss';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CategoriesSection = ({
  isLoading,
  cats,
  sectionTitle,
  isMainCat = true,
  isSubCat = false
}) => {
  const { t } = useTranslation();
  // const [fetchedData, setFetchedData] = useState([]);

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

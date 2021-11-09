import React from 'react';
import CategoriesCard from './CategoriesCard';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
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
    if (cats?.length === 0) return 'No found categories';
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
        <Spin />
      </div>
    );
  }

  if (cats) {
    return (
      <section className="categories-section">
        {sectionTitle ? <h1>{sectionTitle}</h1> : null}
        <div className="custom-container">
          <p className="main-title">{t('categories_section.main_title')}</p>
          {renderCategoriesUl()}
        </div>
      </section>
    );
  }
  return null;
};

export default CategoriesSection;

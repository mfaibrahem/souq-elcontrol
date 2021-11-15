import React from 'react';
import { Empty, Spin, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import useServices from '../../custom-hooks/useServices';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import { useHistory } from 'react-router-dom';
import './ServicesPage.scss';

const ServicesPage = () => {
  const params = useParams();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const {
    iseLoadingServices,
    allFetchedServices,
    setFetchServicesCount,
    servicesPagination
  } = useServices();
  const renderPageUl = () => {
    if (iseLoadingServices) {
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

    if (allFetchedServices?.services?.data?.length === 0)
      return <Empty description="No Services found" />;
    else if (allFetchedServices?.services?.data?.length > 0) {
      return (
        <>
          <ul className="services-ul">
            {allFetchedServices.services.data.map((ele) => {
              return (
                <li key={ele?.id}>
                  <RouterLink
                    to={routerLinks?.serviceDetailsRoute(
                      params?.categoryId,
                      params?.subCategoryId,
                      params?.carId,
                      ele.id
                    )}
                  >
                    <div className="card-content">
                      <div className="card-img">
                        <CustomImage src={ele?.image} />
                      </div>
                      <div className="card-data">
                        <div className="card-name">{ele?.name}</div>
                        {ele?.price ? (
                          <div className="card-price">
                            <span className="price-span">{ele?.price}</span>
                            <span>{i18n.language === 'ar' && 'ريــال'}</span>
                            <span>{i18n.language === 'en' && 'SAR'}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </RouterLink>
                </li>
              );
            })}
          </ul>

          {servicesPagination && (
            <Pagination
              defaultCurrent={1}
              // current={ordersPagination.current_page}
              pageSize={servicesPagination?.per_page}
              total={servicesPagination?.total}
              // itemRender={itemRender}
              onChange={(page, pageSize) => {
                setFetchServicesCount((prev) => prev + 1);
                history.push(
                  `${routerLinks.servicesRoute(
                    params?.categoryId,
                    params?.subCategoryId,
                    params?.carId
                  )}?page=${page}`
                );
              }}
              hideOnSinglePage={true}
            />
          )}
        </>
      );
    }
  };

  return (
    <div className="shared-custom-page services-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.categories'),
            isLink: true,
            to: routerLinks?.categoriesRoute
          },
          {
            title: allFetchedServices?.mainCat?.name,
            isLink: true,
            to: routerLinks?.subCategoriesRoute(params?.categoryId)
          },
          {
            title: allFetchedServices?.car?.name,
            isLink: true,
            to: routerLinks?.carsRoute(
              params?.categoryId,
              params?.subCategoryId
            )
          },
          {
            title: t('breadcrumb_section.services'),
            isLink: false
          }
        ]}
      />
      <section className="cards-section">
        <div className="custom-container">{renderPageUl()}</div>
      </section>
    </div>
  );
};

export default ServicesPage;

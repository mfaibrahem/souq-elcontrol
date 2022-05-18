import React from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, Pagination } from 'antd';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import './ServiceCentersPage.scss';
import useServiceCenters from '../../custom-hooks/useServiceCenters';
import CustomImage from '../../common/custom-image/CustomImage';
import fixedMainCats from '../../fixedMainCats';

const ServiceCentersPage = () => {
  const history = useHistory();
  const { i18n, t } = useTranslation();
  const {
    iseLoadingCenters,
    allFetchedCenters,
    centersPagination,
    setFetchCentersCount
  } = useServiceCenters();
  const params = useParams();
  const renderServiceCentersUl = () => {
    if (iseLoadingCenters) {
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
    } else if (allFetchedCenters?.length === 0)
      return <Empty description="No Service centers found" />;
    else if (allFetchedCenters?.length > 0) {
      return (
        <>
          <ul className="service-centers-ul">
            {allFetchedCenters.map((ele) => {
              return (
                <li key={ele?.id}>
                  <RouterLink
                    className="card-link"
                    to={routerLinks?.singleServiceCenter(
                      params?.categoryId,
                      params?.cityId,
                      ele.id
                    )}
                  >
                    <div className="card-content">
                      <CustomImage className="card-img" src={ele?.image} />
                      <div className="card-data">
                        <div className="card-data">
                          <div className="card-name">{ele?.name}</div>
                        </div>
                      </div>
                    </div>
                  </RouterLink>
                </li>
              );
            })}
          </ul>

          {centersPagination && (
            <Pagination
              defaultCurrent={1}
              // current={ordersPagination.current_page}
              pageSize={centersPagination?.per_page}
              total={centersPagination?.total}
              // itemRender={itemRender}
              onChange={(page, pageSize) => {
                setFetchCentersCount((prev) => prev + 1);
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
    <div className="shared-custom-page service-centers-page">
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
            to: routerLinks.categoriesRoute
          },
          {
            title: 'قسم مراكز الصيانة',
            isLink: true,
            to: routerLinks?.cities(fixedMainCats?.maintenanceService)
          },
          {
            title: allFetchedCenters?.length > 0 && allFetchedCenters[0]?.city,
            isLink: false
          }
        ]}
      />
      <section className="service-centers-section">
        <div className="custom-container">{renderServiceCentersUl()}</div>
      </section>
    </div>
  );
};

export default ServiceCentersPage;

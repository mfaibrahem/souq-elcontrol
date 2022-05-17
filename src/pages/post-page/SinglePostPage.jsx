import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import calendarImg from '../../assets/imgs/icons/calendar.png';
import { LoadingOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import CustomImage from '../../common/custom-image/CustomImage';
import { Link as RouterLink, useParams } from 'react-router-dom';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';
import useSinglePost from '../../custom-hooks/useSinglePost';
import './SinglePostPage.scss';

const SinglePostPage = () => {
  const { t } = useTranslation();
  const { isLoading, fetchedBlog, fetchedRelatedBlogs } = useSinglePost();
  const params = useParams();
  if (isLoading) {
    return (
      <div
        className="custom-container"
        style={{
          paddingTop: 92,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      </div>
    );
  } else if (!fetchedBlog) {
    return <Empty description={false}>Blog Not Found!!!</Empty>;
  } else if (fetchedBlog)
    return (
      <div className="single-blog-page">
        <div className="breadcrumb-title">
          <CustomBreadcrubm
            arr={[
              {
                title: t('main_app_bar_links.home'),
                isLink: true,
                to: routerLinks?.homePage
              },
              {
                title: fetchedBlog.title,
                isLink: false
              }
            ]}
          />
          <div className="custom-container">
            <h2 className="page-title">{fetchedBlog.title}</h2>
            <div className="date-wrap">
              <img src={calendarImg} alt="date" /> {fetchedBlog.created_at}
            </div>
          </div>
        </div>

        <div className="custom-container">
          <div className="main-page-wrap">
            <div className="blog-details">
              <CustomImage src={fetchedBlog.image} className="blog-img" />

              <div className="blog-desc">{fetchedBlog.content}</div>
            </div>

            <div className="filter-related-wrap">
              {fetchedRelatedBlogs?.length > 0 && (
                <div className="related-wrap">
                  <h3>Related Posts</h3>

                  <div className="related-blogs-ul">
                    {fetchedRelatedBlogs.map((obj) => (
                      <RouterLink
                        className="blog-wrap"
                        to={servicesRouterLinks?.singleBlogRoute(obj?.id)}
                      >
                        <div className="blog-media">
                          <img src={obj?.image} alt="" />
                        </div>
                        <div className="blog-title__date">
                          <div className="cat-wrap">{obj?.cat?.name}</div>
                          <div className="title">{obj?.title}</div>
                          <div className="blog-date">
                            <i className="icon-calendar"></i>
                            <span> {obj?.date} </span>
                          </div>
                        </div>
                      </RouterLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

  return null;
};

export default SinglePostPage;

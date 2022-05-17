/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';
import { Empty, Pagination } from 'antd';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import getAllPostsApi from '../../apis/posts-apis/getAllPostsApi';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';
import PostsContext from '../../contexts/posts-context/PostsContext';
import PostCard from './PostCard';
import './PostsPage.scss';

const PostsPage = () => {
  const history = useHistory();
  const { i18n, t } = useTranslation();
  const { search } = useLocation();
  const values = queryString.parse(search);
  const params = useParams();
  const {
    isLoadingBlogs,
    setIsLoadingBlogs,
    setAllFetchedBlogs,
    fetchBlogsCount,
    setFetchBlogsCount,
    allFetchedBlogs,
    blogsPagination,
    setBlogsPagination,
    blogsFilter
  } = useContext(PostsContext);
  const customApiRequest = useCustomApiRequest();

  useEffect(() => {
    let isMounted = true;
    setIsLoadingBlogs(true);
    customApiRequest(
      getAllPostsApi(
        {
          ...blogsFilter,
          ...values,
          catId: params?.subCategoryId
        },
        i18n.language
      ),
      (res) => {
        if (isMounted) {
          setIsLoadingBlogs(false);
          if (checkRes(res) && res.data?.data?.data) {
            const data = res.data.data.data;
            setAllFetchedBlogs(data);
            if (res.data.data?.pagination) {
              setBlogsPagination(res.data.data.pagination);
            }
          }
        }
      },
      (error) => {
        setIsLoadingBlogs(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchBlogsCount, search]);

  const renderBlogs = () => {
    if (isLoadingBlogs) {
      return (
        <div
          className="custom-container"
          style={{
            marginTop: 92,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      );
    } else if (allFetchedBlogs?.length === 0)
      return <Empty description={false}>No Blogs Found!!!</Empty>;
    else if (allFetchedBlogs?.length > 0) {
      return (
        <div className="blogs-list">
          {allFetchedBlogs.map((blog) => (
            <PostCard key={blog?.id} card={blog} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="blogs-page">
      <div className="breadcrumb-title">
        <CustomBreadcrubm
          arr={[
            {
              title: t('main_app_bar_links.home'),
              isLink: true,
              to: routerLinks?.homePage
            },
            {
              title: t('blogsPage.title'),
              isLink: false
            }
          ]}
        />
        <div className="custom-container">
          <h2 className="page-title">{t('blogsPage.title')}</h2>
        </div>
      </div>

      <div className="page-body">
        <div className="custom-container">
          <div className="main-page-wrap">
            <div className="blogs-pagination-wrap">
              {renderBlogs()}
              {blogsPagination?.total > 0 && (
                <Pagination
                  defaultCurrent={1}
                  current={blogsPagination.current_page}
                  pageSize={blogsPagination.per_page}
                  total={blogsPagination.total}
                  // itemRender={itemRender}
                  onChange={(page, pageSize) => {
                    setFetchBlogsCount((prev) => prev + 1);
                    history.push(
                      `${servicesRouterLinks?.blogsRoute}?page=${page}`
                    );
                  }}
                  hideOnSinglePage={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;

/* eslint-disable eqeqeq */

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
import PostModal from './PostModal';
import UserContext from '../../contexts/user-context/UserProvider';

const PostsPage = () => {
  const history = useHistory();
  const { i18n, t } = useTranslation();
  const { search } = useLocation();
  const values = queryString.parse(search);
  const params = useParams();
  const {
    isLoadingPosts,
    setIsLoadingPosts,
    setAllFetchedPosts,
    fetchPostsCount,
    setFetchPostsCount,
    allFetchedPosts,
    postsPagination,
    setPostsPagination,
    postsFilter,
    formModalOpened,
    setSelectedPost,
    setFormModalOpened,
    selectedPost
  } = useContext(PostsContext);
  const customApiRequest = useCustomApiRequest();
  const { user } = useContext(UserContext);
  useEffect(() => {
    let isMounted = true;
    setIsLoadingPosts(true);
    customApiRequest(
      getAllPostsApi(
        {
          ...postsFilter,
          ...values,
          catId: params?.subCategoryId
        },
        i18n.language
      ),
      (res) => {
        if (isMounted) {
          setIsLoadingPosts(false);
          if (checkRes(res) && res.data?.data?.data) {
            const data = res.data.data.data;
            setAllFetchedPosts(data);
            if (res.data.data?.pagination) {
              setPostsPagination(res.data.data.pagination);
            }
          }
        }
      },
      (error) => {
        setIsLoadingPosts(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchPostsCount, search]);

  const renderBlogs = () => {
    if (isLoadingPosts) {
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
    } else if (allFetchedPosts?.length === 0)
      return <Empty description={false}>No Blogs Found!!!</Empty>;
    else if (allFetchedPosts?.length > 0) {
      return (
        <div className="blogs-list">
          {allFetchedPosts.map((blog) => (
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
        <div className="custom-container page-title-btn">
          <button
            className="add-new-post-btn"
            onClick={() => {
              if (user) setFormModalOpened(true);
              else {
                history.push(routerLinks?.signinPage);
              }
            }}
            type="button"
          >
            + {t('blogsPage.addNew')}
          </button>
        </div>
      </div>

      <div className="page-body">
        <div className="custom-container">
          <div className="main-page-wrap">
            <div className="blogs-pagination-wrap">
              {renderBlogs()}
              {postsPagination?.total > 0 && (
                <Pagination
                  defaultCurrent={1}
                  current={postsPagination.current_page}
                  pageSize={postsPagination.per_page}
                  total={postsPagination.total}
                  // itemRender={itemRender}
                  onChange={(page, pageSize) => {
                    setFetchPostsCount((prev) => prev + 1);
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
      {formModalOpened && (
        <PostModal
          modalOpened={formModalOpened}
          setModalOpened={setFormModalOpened}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          setFetchCount={setFetchPostsCount}
        />
      )}
    </div>
  );
};

export default PostsPage;

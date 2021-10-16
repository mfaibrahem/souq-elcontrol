/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import checkRes from '../../utils/checkRes';
import { Spin, Pagination } from 'antd';
import routerLinks from '../../components/app/routerLinks';
import BlogCard from './BlogCard';
import BlogsFilter from './BlogsFilter';
import getAllBlogsApi from '../../apis/blogs-apis/getAllBlogsApi';
import './BlogsPage.scss';

const BlogsPage = () => {
  const { i18n } = useTranslation();
  const { search } = useLocation();
  const values = queryString.parse(search);
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [allFetchedBlogs, setAllFetchedBlogs] = useState([]);
  const [blogsPagination, setBlogsPagination] = useState(null);

  const { pathname } = useLocation();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getAllBlogsApi(id, { ...values }, i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data?.data;
            if (data?.length >= 0) setAllFetchedBlogs(data);
            if (res?.data?.data?.pagination)
              setBlogsPagination(res.data.data.pagination);

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
  }, [i18n.language, fetchCount, pathname]);

  const renderBlogs = () => {
    return (
      <ul className="blogs-ul">
        {allFetchedBlogs.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </ul>
    );
  };
  const renderPageContent = () => {
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
    if (allFetchedBlogs?.length > 0)
      return (
        <>
          {renderBlogs()}

          <Pagination
            defaultCurrent={1}
            // current={ordersPagination.current_page}
            pageSize={blogsPagination.per_page}
            total={blogsPagination.total}
            // itemRender={itemRender}
            onChange={(page, pageSize) => {
              setFetchCount((prev) => prev + 1);
              history.push(`${routerLinks.blogsPage(id)}?page=${page}`);
            }}
            hideOnSinglePage={true}
          />
        </>
      );
    if (allFetchedBlogs?.length === 0)
      return (
        <h1 style={{ textAlign: 'center', marginTop: 42 }}>
          لا توجد مدونات متاحة!!!
        </h1>
      );
    return null;
  };
  return (
    // <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
    <div className="custom-container">
      <div className="blogs-page shared-custom-page">
        {/* <h1 className="page-main-title bold-font">المدونـــــات</h1> */}
        <BlogsFilter
          setIsLoading={setIsLoading}
          setAllFetchedBlogs={setAllFetchedBlogs}
          setBlogsPagination={setBlogsPagination}
        />
        {renderPageContent()}
      </div>
    </div>
  );
};

export default BlogsPage;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import getSinglePostApi from '../apis/posts-apis/getSinglePostApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useSinglePost = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [fetchedBlog, setFetchedBlog] = useState(null);
  const [fetchedRelatedBlogs, setFetchedRelatedBlogs] = useState(null);
  const customApiRequest = useCustomApiRequest();
  const params = useParams();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoading(true);
      customApiRequest(
        getSinglePostApi(
          {
            postId: params?.postId
          },
          i18n.language
        ),
        (res) => {
          setIsLoading(false);
          if (checkRes(res) && res?.data?.data?.blog) {
            setFetchedBlog(res.data.data.blog);
          }
          if (checkRes(res) && res?.data?.data?.relatedBlogs) {
            setFetchedRelatedBlogs(res.data.data.relatedBlogs);
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchCount, pathname]);

  return {
    isLoading,
    setIsLoading,
    //
    fetchCount,
    setFetchCount,
    //
    fetchedBlog,
    setFetchedBlog,
    //
    fetchedRelatedBlogs,
    setFetchedRelatedBlogs
  };
};

export default useSinglePost;

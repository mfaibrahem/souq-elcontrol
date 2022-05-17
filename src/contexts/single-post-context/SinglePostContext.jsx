import { useState, createContext } from 'react';

const INITIAL_VALUES = {
  isLoadingBlogs: false,
  setIsLoadingBlogs: (v) => {},
  fetchBlogsCount: 0,
  setFetchBlogsCount: (v) => {},
  allFetchedBlogs: null,
  setAllFetchedBlogs: (v) => {},
  //
  blogsPagination: {
    current_page: 1,
    per_page: 0,
    total: 0
  },
  setBlogsPagination: (v) => {},
  // filter
  blogsFilter: {
    page: 1,
    blogId: ''
  },
  setBlogsFilter: (v) => {}
};

const SinglePostContext = createContext(INITIAL_VALUES);

export const SinglePostProvider = ({ children }) => {
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(
    INITIAL_VALUES.isLoadingBlogs
  );

  const [fetchBlogsCount, setFetchBlogsCount] = useState(
    INITIAL_VALUES.fetchBlogsCount
  );
  const [allFetchedBlogs, setAllFetchedBlogs] = useState(
    INITIAL_VALUES.allFetchedBlogs
  );

  const [blogsPagination, setBlogsPagination] = useState(
    INITIAL_VALUES.blogsPagination
  );

  //
  const [blogsFilter, setBlogsFilter] = useState(INITIAL_VALUES.blogsFilter);

  return (
    <SinglePostContext.Provider
      value={{
        isLoadingBlogs,
        setIsLoadingBlogs,
        fetchBlogsCount,
        setFetchBlogsCount,
        allFetchedBlogs,
        setAllFetchedBlogs,
        //
        blogsPagination,
        setBlogsPagination,
        blogsFilter,
        setBlogsFilter
      }}
    >
      {children}
    </SinglePostContext.Provider>
  );
};

export default SinglePostContext;

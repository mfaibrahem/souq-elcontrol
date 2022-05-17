import { useState, createContext } from 'react';

const INITIAL_VALUES = {
  isLoadingPosts: false,
  setIsLoadingPosts: (v) => {},
  fetchPostsCount: 0,
  setFetchPostsCount: (v) => {},
  allFetchedPosts: null,
  setAllFetchedPosts: (v) => {},
  formModalOpened: false,
  setFormModalOpened: (v) => {},
  selectedPost: null,
  setSelectedPost: (v) => {},
  //
  postsPagination: {
    current_page: 1,
    per_page: 0,
    total: 0
  },
  setPostsPagination: (v) => {},
  // filter
  postsFilter: {
    page: 1,
    catId: '',
    searchText: ''
  },
  setPostsFilter: (v) => {}
};

const PostsContext = createContext(INITIAL_VALUES);

export const PostsProvider = ({ children }) => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(
    INITIAL_VALUES.isLoadingPosts
  );

  const [fetchPostsCount, setFetchPostsCount] = useState(
    INITIAL_VALUES.fetchPostsCount
  );
  const [allFetchedPosts, setAllFetchedPosts] = useState(
    INITIAL_VALUES.allFetchedPosts
  );
  const [formModalOpened, setFormModalOpened] = useState(
    INITIAL_VALUES?.formModalOpened
  );
  const [selectedPost, setSelectedPost] = useState(
    INITIAL_VALUES?.selectedPost
  );
  const [postsPagination, setPostsPagination] = useState(
    INITIAL_VALUES.postsPagination
  );

  //
  const [postsFilter, setPostsFilter] = useState(INITIAL_VALUES.postsFilter);

  return (
    <PostsContext.Provider
      value={{
        isLoadingPosts,
        setIsLoadingPosts,
        fetchPostsCount,
        setFetchPostsCount,
        allFetchedPosts,
        setAllFetchedPosts,
        formModalOpened,
        setFormModalOpened,
        selectedPost,
        setSelectedPost,
        //
        postsPagination,
        setPostsPagination,
        postsFilter,
        setPostsFilter
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;

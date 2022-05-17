/* eslint-disable eqeqeq */
import { useState } from 'react';
import SearchIcon from '../../common/icons/SearchIcon';
import useBlogCats from '../../custom-hooks/useBlogCats';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';

const PostsSideCats = () => {
  const { allFetchedCats } = useBlogCats();
  const navigate = useNavigate();
  const { search } = useLocation();
  const values = queryString.parse(search);
  const [searchValue, setSearchValue] = useState(values?.searchText || '');

  return (
    <div className="side-wrap">
      <form
        className="main-app-search-form"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(
            `${servicesRouterLinks?.postsRoute}?page=1&catId=${
              values?.catId || ''
            }&searchText=${searchValue}`
          );
        }}
      >
        <label>
          <div className="icon-wrap">
            <SearchIcon color="#999" />
          </div>
          <input
            type="text"
            name="main_app_search"
            placeholder="Search for posts"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </label>
      </form>
      <div className="cats-wrap-title">
        <h3>Categories</h3>
        <div className="cats-wrap">
          {allFetchedCats?.length > 0 &&
            allFetchedCats?.map((cat) => (
              <RouterLink
                key={cat?.id}
                to={`${servicesRouterLinks?.postsRoute}?page=1&catId=${cat?.id}`}
                className={`cat-link ${
                  values?.catId == cat?.id ? 'selected' : ''
                }`}
              >
                <span>{cat?.name}</span>
                <span>({cat?.blogCount})</span>
              </RouterLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostsSideCats;

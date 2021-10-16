/* eslint-disable eqeqeq */
import React from 'react';
import useCategories from '../../custom-hooks/useCategories';
import { useParams, useHistory } from 'react-router-dom';
import './BlogsFilter.scss';
import routerLinks from '../../components/app/routerLinks';

const BlogsFilter = () => {
  const { id } = useParams();
  const history = useHistory();
  const allCategories = useCategories();
  return (
    allCategories?.length > 0 && (
      <div className="categories-filter-warp">
        <ul className="cats-ul">
          {allCategories.map((cat) => (
            <li
              className={id == cat?.id ? 'selected' : ''}
              key={cat.id}
              onClick={() => {
                history.push(routerLinks.blogsPage(cat.id));
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default BlogsFilter;

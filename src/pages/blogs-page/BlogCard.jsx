import React from 'react';
import parse from 'html-react-parser';
import CustomImage from '../../common/custom-image/CustomImage';
import ShowMoreText from 'react-show-more-text';
import './BlogCard.scss';

const BlogCard = ({ id, title, image, article }) => {
  return (
    <li className="blog-card">
      <div className="card-content">
        <div className="blog-img-wrap">
          <CustomImage src={image} />
        </div>
        <div className="blog-data">
          {title && <div className="blog-title">{title}</div>}
          {article && (
            <ShowMoreText more="إقرأ المزيد" less="إقرأ اقل">
              <div className="article-wrap">{parse(article)}</div>
            </ShowMoreText>
          )}
        </div>
      </div>
    </li>
  );
};

export default BlogCard;

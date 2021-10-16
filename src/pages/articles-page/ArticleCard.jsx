import React from 'react';
import parse from 'html-react-parser';
import CustomImage from '../../common/custom-image/CustomImage';
import './ArticleCard.scss';

const ArticleCard = ({ title, image, article }) => {
  return (
    <li className="article-card">
      <div className="card-content">
        <div className="article-img-wrap">
          <CustomImage src={image} />
        </div>
        <div className="article-data">
          {title && <div className="article-title">{title}</div>}
          {article && <div className="article-wrap">{parse(article)}</div>}
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;

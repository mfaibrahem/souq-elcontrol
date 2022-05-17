import CustomImage from '../../common/custom-image/CustomImage';
import trimWords from '../../utils/trimWords';
import { Link as RouterLink, useParams } from 'react-router-dom';
import './PostCard.scss';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';

const PostCard = ({ card, className }) => {
  const params = useParams();
  return (
    <div className={`blog-card ${className || ''}`}>
      <CustomImage src={card?.image} className="blog-img" />
      <div className="blog-data">
        <div className="blog-cat">{card?.cat?.name}</div>
        <RouterLink
          to={servicesRouterLinks?.singlePost(
            params?.categoryId,
            params?.subCategoryId,
            card?.id
          )}
          className="blog-title"
        >
          {card?.title}
        </RouterLink>

        {card?.content && (
          <div className="card-desc">{trimWords(card.content, 12)}</div>
        )}

        <div className="more-count">
          <RouterLink
            className="more"
            to={servicesRouterLinks?.singlePost(
              params?.categoryId,
              params?.subCategoryId,
              card?.id
            )}
          >
            Read More
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

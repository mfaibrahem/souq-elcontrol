import { useContext } from 'react';
import UserContext from '../../../contexts/user-context/UserProvider';
import CategoriesPage from '../../../pages/categories-page/CategoriesPage';
import SubCategoriesPage from '../../../pages/sub-categories-page/SubCategoriesPage';
import protectMe from '../../../utils/protectMe';
import routerLinks from '../routerLinks';

const ServicesRoutes = () => {
  const { loggedIn } = useContext(UserContext);
  return [
    protectMe(
      routerLinks.categoriesRoute(),
      <CategoriesPage />,
      1,
      routerLinks.signinPage,
      loggedIn
    ),
    protectMe(
      routerLinks.singleCategoryRoute(),
      <SubCategoriesPage />,
      2,
      routerLinks.signinPage,
      loggedIn
    )
  ];
};

export default ServicesRoutes;

import { useContext } from 'react';
import { Route } from 'react-router-dom';
import UserContext from '../../../contexts/user-context/UserProvider';
import CategoriesPage from '../../../pages/categories-page/CategoriesPage';
import SubCategoriesPage from '../../../pages/sub-categories-page/SubCategoriesPage';
import SubCategoryServiceDetailsPage from '../../../pages/sub-category-service-details-page/SubCategoryServiceDetailsPage';
import SubCategoryServicesPage from '../../../pages/sub-category-services-page/SubCategoryServicesPage';
// import protectMe from '../../../utils/protectMe';
import routerLinks from '../routerLinks';

const ServicesRoutes = () => {
  // const { loggedIn } = useContext(UserContext);
  return [
    <Route exact path={routerLinks.categoriesRoute} key={1}>
      <CategoriesPage />
    </Route>,
    <Route exact path={routerLinks.singleCategoryRoute()} key={2}>
      <SubCategoriesPage />
    </Route>,
    <Route exact path={routerLinks.singleSubCategoryRoute()} key={3}>
      <SubCategoryServicesPage />
    </Route>,
    <Route exact path={routerLinks.singleSubCategoryServiceRoute()} key={4}>
      <SubCategoryServiceDetailsPage />
    </Route>

    // protectMe(
    //   routerLinks.singleSubCategoryServiceRoute(),
    //   <SubCategoryServiceDetailsPage />,
    //   4,
    //   routerLinks.signinPage,
    //   loggedIn
    // )
  ];
};

export default ServicesRoutes;

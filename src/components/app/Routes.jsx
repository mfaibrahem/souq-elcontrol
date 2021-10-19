import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticlesPage from '../../pages/articles-page/ArticlesPage';
import BlogsPage from '../../pages/blogs-page/BlogsPage';
import FreeConsultationPage from '../../pages/free-consultation-page/FreeConsultationPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import RealestateDetailsPage from '../../pages/realestate-details-page/RealestateDetailsPage';
import RealestateInvestementPage from '../../pages/realestate-Investement-page/RealestateInvestementPage';
import routerLinks from './routerLinks';
import ServicesRoutes from './services-routes/ServicesRoutes';
const HomePage = lazy(() => import('../../pages/home-page/HomePage'));

const Routes = () => {
  return (
    <Switch>
      <Route exact path={routerLinks.homePage}>
        <HomePage />
      </Route>

      {ServicesRoutes()}
      <Route exact path={routerLinks.freeConsultationPage}>
        <FreeConsultationPage />
      </Route>
      <Route exact path={routerLinks.realestateInvestementPage}>
        <RealestateInvestementPage />
      </Route>
      <Route exact path={routerLinks.realestateDetailsPage()}>
        <RealestateDetailsPage />
      </Route>
      <Route exact path={routerLinks.blogsPage()}>
        <BlogsPage />
      </Route>
      <Route exact path={routerLinks.articlesPage()}>
        <ArticlesPage />
      </Route>

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;

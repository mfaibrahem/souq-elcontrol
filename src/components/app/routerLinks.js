import servicesRouterLinks from './services-routes/servicesRouterLinks';

const routerLinks = {
  ////////////////////////////
  homePage: '/',
  ///////////////////////////
  signinPage: '/signin',
  signupPage: '/signup',
  profilePage: '/profile',
  ////////////////////////////
  myOrdersRoute: '/my-orders',
  ...servicesRouterLinks,
  ////////////////////////////
  startSellingRoute: '/start-selling',
  ////////////////////////////////
  serviceCenterSignupRoute: '/service-cener-signup',
  ////////////////////////////////
  aboutUsRoute: '/about-us',
  ////////////////////////////////
  notFound: '/not-found'
  //////////////////////////////
};

export default routerLinks;

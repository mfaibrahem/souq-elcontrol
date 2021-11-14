import servicesRouterLinks from './services-routes/servicesRouterLinks';

const routerLinks = {
  ////////////////////////////
  homePage: '/',
  ///////////////////////////
  signinPage: '/signin',
  signupPage: '/signup',
  profilePage: '/profile',
  ////////////////////////////
  ...servicesRouterLinks,
  ////////////////////////////
  startSellingRoute: '/start-selling',
  ////////////////////////////////
  aboutUsRoute: '/about-us',
  ////////////////////////////////
  notFound: '/not-found'
  //////////////////////////////
};

export default routerLinks;

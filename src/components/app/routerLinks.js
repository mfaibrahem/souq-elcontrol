const routerLinks = {
  ////////////////////////////
  homePage: '/',
  ///////////////////////////
  signinPage: '/signin',
  ////////////////////////////
  freeConsultationPage: '/free-consultation',
  ////////////////////////////
  realestateInvestementPage: '/real-estate-investment',
  realestateDetailsPage: (id) =>
    id ? `/real-estate-investment/${id}` : '/real-estate-investment/:id',
  ////////////////////////////
  clientsListPage: '/our-clients-list',
  ////////////////////////////////
  contactPage: '/contact-us',
  ////////////////////////////
  blogsPage: (id) => (id ? `/blogs/${id}` : '/blogs/:id'),
  ////////////////////////////////
  articlesPage: (id) => (id ? `/articles/${id}` : '/articles/:id'),
  ////////////////////////////////
  notFound: '/not-found'
  //////////////////////////////
};

export default routerLinks;

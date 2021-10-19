import routerLinks from '../app/routerLinks';

const mainAppBarLinks = (t) => [
  {
    id: 1,
    name: t('main_app_bar_links.home'),
    link: routerLinks.homePage
  },
  {
    id: 2,
    name: t('main_app_bar_links.categories'),
    link: routerLinks.categoriesRoute
  },
  {
    id: 3,
    name: t('main_app_bar_links.myOrders'),
    link: routerLinks.realestateInvestementPage
  },
  {
    id: 5,
    name: t('main_app_bar_links.startSelling'),
    link: routerLinks.contactPage
  },
  {
    id: 6,
    name: t('main_app_bar_links.aboutUs'),
    link: routerLinks.blogsPage()
  }
  // {
  //   id: 7,
  //   name: t('main_app_bar_links.real_states'),
  //   link: routerLinks.realestatesPage
  // },
  // {
  //   id: 8,
  //   name: t('main_app_bar_links.contracting'),
  //   link: routerLinks.contractingPage
  // },
  // {
  //   id: 9,
  //   name: t('main_app_bar_links.decorations'),
  //   link: routerLinks.decorationsPage
  // }
];

export default mainAppBarLinks;

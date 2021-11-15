import routerLinks from '../app/routerLinks';

const mainAppBarLinks = (t, user) => {
  if (user) {
    return [
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
        link: routerLinks.myOrdersRoute
      },
      {
        id: 4,
        name: t('main_app_bar_links.startSelling'),
        link: routerLinks.startSellingRoute
      },
      {
        id: 5,
        name: t('main_app_bar_links.aboutUs'),
        link: routerLinks.aboutUsRoute
      }
    ];
  }
  return [
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
      id: 4,
      name: t('main_app_bar_links.startSelling'),
      link: routerLinks.startSellingRoute
    },
    {
      id: 5,
      name: t('main_app_bar_links.aboutUs'),
      link: routerLinks.aboutUsRoute
    }
  ];
};

export default mainAppBarLinks;

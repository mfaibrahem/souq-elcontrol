const servicesRouterLinks = {
  // all categories page that contains all categories
  categoriesRoute: '/categories',
  // single category page contains sub categories
  subCategoriesRoute: (categoryId) => {
    if (categoryId) return `/categories/${categoryId}/sub-categories`;
    return '/categories/:categoryId/sub-categories';
  },
  // single sub category page contains cars page
  carsRoute: (categoryId, subCategoryId) => {
    if (categoryId && subCategoryId)
      return `/categories/${categoryId}/sub-categories/${subCategoryId}/cars`;
    return '/categories/:categoryId/sub-categories/:subCategoryId/cars';
  },
  // single sub category car page that contains the sub category car => services page
  servicesRoute: (categoryId, subCategoryId, carId) => {
    if (categoryId && subCategoryId)
      return `/categories/${categoryId}/sub-categories/${subCategoryId}/cars/${carId}/services`;

    return '/categories/:categoryId/sub-categories/:subCategoryId/cars/:carId/services';
  },
  // service details page
  serviceDetailsRoute: (categoryId, subCategoryId, carId, serviceId) => {
    if (categoryId && subCategoryId && carId && serviceId)
      return `/categories/${categoryId}/sub-categories/${subCategoryId}/cars/${carId}/services/${serviceId}/details`;
    return '/categories/:categoryId/sub-categories/:subCategoryId/cars/:carId/services/:serviceId/details';
  },
  //
  serviceMakeOrderRoute: (categoryId, subCategoryId, carId, serviceId) => {
    if (categoryId && subCategoryId)
      return `/categories/${categoryId}/sub-categories/${subCategoryId}/cars/${carId}/services/${serviceId}/make-order`;
    return '/categories/:categoryId/sub-categories/:subCategoryId/cars/:carId/services/:serviceId/make-order';
  }
};

export default servicesRouterLinks;

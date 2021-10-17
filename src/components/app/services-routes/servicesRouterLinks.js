const servicesRouterLinks = {
  // all categories page that contains all categories
  categoriesRoute: '/categories',
  // single category page contains sub categories
  singleCategoryRoute: (categoryId) => {
    if (categoryId) return `/categories/${categoryId}`;
    return '/categories/:categoryId';
  },
  // single sub category page contains sub category services
  singleSubCategoryRoute: (categoryId, subCategoryId) => {
    if (categoryId && subCategoryId)
      return `/categories/${categoryId}/sub-categories/${subCategoryId}/services`;
    return '/categories/:categoryId/sub-categories/:subCategoryId/services';
  },
  // single sub category service page that contains the sub category service details
  singleSubCategoryServiceRoute: (categoryId, subCategoryId, serviceId) => {
    if (categoryId && subCategoryId)
      return `/categories/${categoryId}/sub-categories/${subCategoryId}/services/${serviceId}`;

    return '/categories/:categoryId/sub-categories/:subCategoryId/services/:serviceId';
  },
  //
  settingsPosPage: '/settings/pos',
  settingsMeasureUnitsPage: '/settings/measure-units',
  settingsWarehousesPage: '/settings/warehouses',
  settingsWarehousesDetailsPage: (id) => {
    if (id) return `/settings/warehouses/${id}`;
    return '/settings/warehouses/:id';
  },
  settingsCategoriesPage: '/settings/categories',
  settingsSubCategoriesPage: (catId) => {
    if (catId) {
      return `/settings/categories/${catId}`;
    }
    return `/settings/categories/:catId`;
  },
  systemSettingsPage: '/settings/system-settings',
  systemUsersPage: '/settings/system-users',
  systemHelpPage: '/settings/help'
};

export default servicesRouterLinks;

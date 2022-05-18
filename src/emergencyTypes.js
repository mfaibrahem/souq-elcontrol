export const emergencyTypesValues = {
  yes: 1,
  noe: 2
};

const emergencyTypes = (t) => {
  return [
    {
      id: 1,
      name: t('emergencyTypes.yes'),
      value: 1
    },
    {
      id: 2,
      name: t('emergencyTypes.no'),
      value: 2
    }
  ];
};

export default emergencyTypes;

const sharedT = (t, key) => t(`week.${key}`);
const weekDaysArr = (t) => {
  return [
    {
      id: 1,
      name: sharedT(t, 'friday'),
      value: 1
    },
    {
      id: 2,
      name: sharedT(t, 'saturday'),
      value: 2
    },
    {
      id: 3,
      name: sharedT(t, 'sunday'),
      value: 3
    },
    {
      id: 4,
      name: sharedT(t, 'monday'),
      value: 4
    },
    {
      id: 5,
      name: sharedT(t, 'tusday'),
      value: 5
    },
    {
      id: 6,
      name: sharedT(t, 'wednesday'),
      value: 6
    },
    {
      id: 7,
      name: sharedT(t, 'thursday'),
      value: 7
    }
  ];
};

export default weekDaysArr;

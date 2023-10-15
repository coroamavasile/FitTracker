import AppTable from '../../common/core/app-table/app-table.component';

export const NutritionLoggerFeature = () => {
  const columns = [
    { value: 'name', name: 'Name' },
    { value: 'proteins', name: 'Proteins' },
    { value: 'fats', name: 'Fats' },
    { value: 'carbohydrates', name: 'Carbohydrates' },
  ];

  const data = [
    {
      id: 1,
      name: 'Soup',
      proteins: 13,
      fats: 355,
      carbohydrates: 343,
    },
    {
      id: 2,
      name: 'Pizza',
      carbohydrates: 999,
      proteins: 123,
      fats: 32,
    },
    {
      id: 3,
      name: 'Shamola',
      proteins: 12,
      fats: 32,
      carbohydrates: 345,
    },
  ];

  return (
    <div>
      <AppTable columns={columns} data={data} />
    </div>
  );
};

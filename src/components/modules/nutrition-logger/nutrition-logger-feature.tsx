import { useEffect, useMemo } from 'react';
import AppTable from '../../common/core/app-table/app-table.component';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getNutritionsAction } from '../../../slices';

export const NutritionLoggerFeature = () => {
  const dispatch = useAppDispatch();
  const { data: nutritions } = useAppSelector((state) => state.nutritionLogger);

  const columns = [
    { value: 'name', name: 'Name' },
    { value: 'proteins', name: 'Proteins' },
    { value: 'fats', name: 'Fats' },
    { value: 'carbohydrates', name: 'Carbohydrates' },
    { value: 'calories', name: 'Calories' },
    { value: 'date', name: 'Date' },
  ];

  const renderedNutritions = useMemo(() => {
    return nutritions.map((item) => ({ ...item, date: new Date(item.date).toLocaleString() }));
  }, [nutritions]);

  useEffect(() => {
    dispatch(getNutritionsAction());
  }, []);

  return (
    <div>
      <button>Add new meal</button>
      <AppTable columns={columns} data={renderedNutritions} />
    </div>
  );
};

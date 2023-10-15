import { useEffect, useMemo, useState } from 'react';
import AppTable from '../../common/core/app-table/app-table.component';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getNutritionsAction } from '../../../slices';
import { AppModal } from '../../common/core/app-modal/app-modal.component';
import { NutritionLoggerForm } from './components';

export const NutritionLoggerFeature = () => {
  const dispatch = useAppDispatch();
  const { data: nutritions } = useAppSelector((state) => state.nutritionLogger);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    <>
      <button onClick={() => setIsModalOpen(true)}>Add new meal</button>
      <AppTable columns={columns} data={renderedNutritions} />
      <AppModal
        title="Add new meal"
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        children={<NutritionLoggerForm closeModal={() => setIsModalOpen(false)} />}
      />
    </>
  );
};

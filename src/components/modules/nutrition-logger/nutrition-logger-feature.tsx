import { useEffect, useMemo, useState } from 'react';
import AppTable from '../../common/core/app-table/app-table.component';
import { useAppDispatch, useAppSelector } from '../../../store';
import { deleteNutritionAction, getNutritionsAction } from '../../../slices';
import { AppModal } from '../../common/core/app-modal/app-modal.component';
import { NutritionLoggerForm } from './components';
import { AppSubmitButton } from '../../common/core/app-button/app-button.component';

import styles from './nutrition-logger.module.scss';
import { AppConfirmationModal } from '../../common/core/app-modal/app-confirmation-modal.component';
import { INutritionLogger } from '../../../interfaces';
import { NOT_AVAILABLE } from '../../../constants';

export const NutritionLoggerFeature = () => {
  const dispatch = useAppDispatch();
  const { data: nutritions } = useAppSelector((state) => state.nutritionLogger);

  const [isModalOpen, setIsModalOpen] = useState<{ create: boolean; delete: boolean }>({
    create: false,
    delete: false,
  });
  const [selectedItem, setSelectedItem] = useState<INutritionLogger | undefined>(undefined);

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

  const closeModal = () => setIsModalOpen({ create: false, delete: false });

  useEffect(() => {
    dispatch(getNutritionsAction());
  }, []);

  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <AppSubmitButton
            onClick={() => {
              setSelectedItem(undefined);
              setIsModalOpen((prev) => ({ ...prev, create: true }));
            }}
            name="Add new meal"
          />
        </div>
      </div>
      <AppTable
        columns={columns}
        data={renderedNutritions}
        hasActions
        onDeleteClick={(item: unknown) => {
          setIsModalOpen((prev) => ({ ...prev, delete: true }));
          setSelectedItem(item as INutritionLogger);
        }}
        onEditClick={(item: unknown) => {
          setIsModalOpen((prev) => ({ ...prev, create: true }));
          setSelectedItem(item as INutritionLogger);
        }}
      />
      <AppModal
        title={selectedItem ? 'Update meal' : 'Add new meal'}
        open={isModalOpen.create}
        handleClose={closeModal}
        children={<NutritionLoggerForm formState={selectedItem} closeModal={closeModal} />}
      />
      <AppConfirmationModal
        handleClose={closeModal}
        itemName={selectedItem?.name ?? NOT_AVAILABLE}
        open={isModalOpen.delete}
        handleSubmit={() => {
          selectedItem && dispatch(deleteNutritionAction(selectedItem.id));
          closeModal();
          setSelectedItem(undefined);
        }}
      />
    </>
  );
};

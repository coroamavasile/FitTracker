import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { AppConfirmationModal } from '../../common/core/app-modal/app-confirmation-modal.component';
import { IProgressLogger } from '../../../interfaces';
import { deleteProgressAction, getProgressAction } from '../../../slices';

import styles from './progress-logger-feature.module.scss';
import { AppSubmitButton } from '../../common/core/app-button/app-button.component';
import AppTable from '../../common/core/app-table/app-table.component';
import { AppModal } from '../../common/core/app-modal/app-modal.component';
import { ProgressLoggerForm } from './components';

export const ProgressLoggerFeature = () => {
  const dispatch = useAppDispatch();
  const { data: progress } = useAppSelector((state) => state.progressLogger);

  const [isModalOpen, setIsModalOpen] = useState<{ create: boolean; delete: boolean }>({
    create: false,
    delete: false,
  });
  const [selectedItem, setSelectedItem] = useState<IProgressLogger | undefined>(undefined);

  const columns = [
    { value: 'date', name: 'Date' },
    { value: 'weight', name: 'Weight' },
    { value: 'chestMeasurement', name: 'Chest' },
    { value: 'bicepsMeasurement', name: 'Biceps' },
    { value: 'waistMeasurement', name: 'Waist' },
    { value: 'hipsMeasurement', name: 'Hips' },
  ];

  const renderProgress = useMemo(() => {
    return progress.map((item) => ({ ...item, date: new Date(item.date).toLocaleString() }));
  }, [progress]);

  const closeModal = () => setIsModalOpen({ create: false, delete: false });

  useEffect(() => {
    dispatch(getProgressAction());
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
        data={renderProgress}
        hasActions
        onDeleteClick={(item: unknown) => {
          setIsModalOpen((prev) => ({ ...prev, delete: true }));
          setSelectedItem(item as IProgressLogger);
        }}
        onEditClick={(item: unknown) => {
          setIsModalOpen((prev) => ({ ...prev, create: true }));
          setSelectedItem(item as IProgressLogger);
        }}
      />
      <AppModal
        title={selectedItem ? 'Update meal' : 'Add new meal'}
        open={isModalOpen.create}
        handleClose={closeModal}
        children={<ProgressLoggerForm formState={selectedItem} closeModal={closeModal} />}
      />
      <AppConfirmationModal
        handleClose={closeModal}
        itemName="this item"
        open={isModalOpen.delete}
        handleSubmit={() => {
          selectedItem && dispatch(deleteProgressAction(selectedItem.id));
          closeModal();
          setSelectedItem(undefined);
        }}
      />
    </>
  );
};

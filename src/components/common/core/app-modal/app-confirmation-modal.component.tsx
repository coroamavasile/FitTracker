import { Button, Typography } from '@mui/material';

import { AppModal } from './app-modal.component';

import styles from './app-modal.module.scss';

interface AppConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  itemName: string;
  handleSubmit: () => void;
}

export const AppConfirmationModal = (props: AppConfirmationModalProps) => {
  const { handleClose, open, itemName, handleSubmit } = props;

  return (
    <AppModal title="Delete" handleClose={handleClose} open={open}>
      <Typography>Are you sure you want to delete {itemName}?</Typography>
      <div className={styles.buttonsContainer}>
        <Button variant="contained" color="error" onClick={handleSubmit}>
          Yes
        </Button>
        <Button variant="contained" onClick={handleClose}>
          No
        </Button>
      </div>
    </AppModal>
  );
};

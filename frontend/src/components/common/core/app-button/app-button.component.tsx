import { purple } from '@mui/material/colors';

import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './app-button.module.scss';

interface ButtonInterface {
  name: string;
  onClick?: () => void;
}

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: 'purple',
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export const AppSubmitButton = (props: ButtonInterface) => {
  const { name, onClick } = props;

  return (
    <CustomButton onClick={onClick} className={styles.buttonContainer} variant="contained" fullWidth type="submit">
      {name}
    </CustomButton>
  );
};

export const AppEditButton = (props: any) => {
  const { onClick } = props;

  return (
    <Button sx={{ width: 10 }} size="small" onClick={onClick} className={styles.buttonContainer} type="submit">
      <EditIcon />
    </Button>
  );
};

export const AppDeleteButton = (props: any) => {
  const { onClick } = props;

  return (
    <Button sx={{ width: 10 }} onClick={onClick} className={styles.buttonContainer} color="error" type="submit">
      <DeleteIcon />
    </Button>
  );
};

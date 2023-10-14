import { purple } from '@mui/material/colors';

import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import styles from './app-button.module.scss';

interface ButtonInterface {
  name: string;
}

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export const AppSubmitButton = (props: ButtonInterface) => {
  const { name } = props;

  return (
    <CustomButton className={styles.buttonContainer} variant="contained" fullWidth type="submit">
      {name}
    </CustomButton>
  );
};

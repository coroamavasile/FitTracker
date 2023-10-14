import { TextField, InputLabel } from '@mui/material';

import styles from './app-input.module.scss';

interface InputInterface {
  id: string;
  name: string;
  label: string;
  value?: unknown;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
}

export const AppTextInput = (props: InputInterface) => {
  const { label, id, name, value, error, helperText, onBlur, onChange, type = 'text' } = props;

  return (
    <div className={styles.inputContainer}>
      <InputLabel>{label}</InputLabel>
      <TextField
        className={styles.input}
        fullWidth
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
      />
    </div>
  );
};

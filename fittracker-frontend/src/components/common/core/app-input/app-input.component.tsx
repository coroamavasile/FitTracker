import { TextField, InputLabel } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import styles from './app-input.module.scss';
import dayjs from 'dayjs';

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
        size="small"
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

export const AppDateTimeInput = (props: any) => {
  const { label, id, name, value, error, helperText, onBlur, onChange, type = 'text' } = props;

  return (
    <div className={styles.inputContainer}>
      <InputLabel>{label}</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          ampm={false}
          sx={{ width: '100%' }}
          slotProps={{ textField: { size: 'small' } }}
          value={dayjs(value)}
          onChange={(newValue: any) => {
            newValue && onChange(newValue.$d.toISOString());
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

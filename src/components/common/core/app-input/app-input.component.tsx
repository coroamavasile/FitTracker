import { TextField } from '@mui/material';

export const AppTextInput = () => {
  return (
    <TextField
      fullWidth
      id="email"
      name="email"
      label="Email"
      // value={formik.values.email}
      // onChange={formik.handleChange}
      // onBlur={formik.handleBlur}
      // error={formik.touched.email && Boolean(formik.errors.email)}
      // helperText={formik.touched.email && formik.errors.email}
    />
  );
};

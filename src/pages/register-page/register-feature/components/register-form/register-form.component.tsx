import {TextField, Button} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {registerAction} from '../../../../../slices';
import {useAppDispatch} from '../../../../../store/store';
import {useNavigate} from 'react-router';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {name: '', email: '', password: '', confirmPassword: ''},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const {email, name, password} = values;
      const actionResult = await dispatch(
        registerAction({email, name, password})
      );

      if (registerAction.fulfilled.match(actionResult)) {
        navigate('/login');
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        style={{display: 'flex', flexDirection: 'column', gap: '10px'}}
      >
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

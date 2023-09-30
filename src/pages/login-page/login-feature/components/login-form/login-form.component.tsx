import {TextField, Button} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {loginAction, registerAction} from '../../../../../slices';
import {useAppDispatch} from '../../../../../store/store';
import {useNavigate} from 'react-router';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {name: '', email: '', password: '', confirmPassword: ''},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const {email, name, password} = values;
      const actionResult = await dispatch(loginAction({email, password}));

      if (registerAction.fulfilled.match(actionResult)) {
        // navigate('/home');
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Log in
        </Button>
      </form>
    </div>
  );
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

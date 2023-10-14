import * as yup from 'yup';

import { IUser } from '../../../../../interfaces/user.interface';
import { AppTextInput } from '../../../../common';
import { AppSubmitButton } from '../../../../common/core/app-button/app-button.component';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../../../../store';
import { updateUserAction } from '../../../../../slices';

interface AccountFormProps {
  user: IUser;
}

export const AccountForm = (props: AccountFormProps) => {
  const { user } = props;
  const { name, description, phone, profession, profileImage } = user;

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { name, description, phone, profession, profileImage },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { name, description, phone, profession, profileImage } = values;

      await dispatch(updateUserAction({ ...user, name, description, phone, profession, profileImage }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <AppTextInput
        label="Name"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <AppTextInput
        label="Description"
        id="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <AppTextInput
        label="Phone"
        id="phone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <AppTextInput
        label="Profession"
        id="profession"
        name="profession"
        value={formik.values.profession}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.profession && Boolean(formik.errors.profession)}
        helperText={formik.touched.profession && formik.errors.profession}
      />
      <AppTextInput
        label="Profile Image Url"
        id="profileImage"
        name="profileImage"
        value={formik.values.profileImage}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
        helperText={formik.touched.profileImage && formik.errors.profileImage}
      />
      <AppSubmitButton name="Save Changes" />
    </form>
  );
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  phone: yup.string().required('Phone is required'),
  profession: yup.string().required('Profession is required'),
});

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../../store/store';

import { AppDateTimeInput, AppTextInput } from '../../../../common';
import { AppSubmitButton } from '../../../../common/core/app-button/app-button.component';
import { createNutritionAction } from '../../../../../slices';
import { INutritionLogger } from '../../../../../interfaces';

interface NutritionLoggerFormProps {
  closeModal: () => void;
}

export const NutritionLoggerForm = (props: NutritionLoggerFormProps) => {
  const { closeModal } = props;
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { name: '', calories: 0, proteins: 0, carbohydrates: 0, fats: 0, date: new Date().toISOString() },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(createNutritionAction(values as INutritionLogger));
      closeModal();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <AppTextInput
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <AppTextInput
          id="calories"
          name="calories"
          label="Calories"
          type="number"
          value={formik.values.calories}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.calories && Boolean(formik.errors.calories)}
          helperText={formik.touched.calories && formik.errors.calories}
        />
        <AppTextInput
          id="fats"
          name="fats"
          label="Fats"
          type="number"
          value={formik.values.fats}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fats && Boolean(formik.errors.fats)}
          helperText={formik.touched.fats && formik.errors.fats}
        />
        <AppTextInput
          id="proteins"
          name="proteins"
          label="Proteins"
          type="number"
          value={formik.values.proteins}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.proteins && Boolean(formik.errors.proteins)}
          helperText={formik.touched.proteins && formik.errors.proteins}
        />
        <AppTextInput
          id="carbohydrates"
          name="carbohydrates"
          label="Carbohydrates"
          type="number"
          value={formik.values.carbohydrates}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.carbohydrates && Boolean(formik.errors.carbohydrates)}
          helperText={formik.touched.carbohydrates && formik.errors.carbohydrates}
        />
        <AppDateTimeInput
          id="date"
          label="Date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        />
        <AppSubmitButton name="Create Meal" />
      </form>
    </div>
  );
};

const validationSchema = yup.object({
  name: yup.string().required('Required field'),
  calories: yup.number().required('Required field'),
  proteins: yup.number().required('Required field'),
  carbohydrates: yup.number().required('Required field'),
  fats: yup.number().required('Required field'),
});

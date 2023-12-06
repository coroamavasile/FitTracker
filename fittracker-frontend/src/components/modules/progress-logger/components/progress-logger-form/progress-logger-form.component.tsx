import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../../store/store';

import { AppDateTimeInput, AppTextInput } from '../../../../common';
import { AppSubmitButton } from '../../../../common/core/app-button/app-button.component';
import { createProgressAction, updateProgressAction } from '../../../../../slices';
import { IProgressLogger } from '../../../../../interfaces';

interface ProgressLoggerFormProps {
  formState: IProgressLogger | undefined;
  closeModal: () => void;
}

export const ProgressLoggerForm = (props: ProgressLoggerFormProps) => {
  const { closeModal, formState } = props;
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: formState ?? {
      weight: 0,
      chestMeasurement: 0,
      bicepsMeasurement: 0,
      hipsMeasurement: 0,
      waistMeasurement: 0,
      date: new Date().toISOString(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (formState) {
        await dispatch(updateProgressAction(values as IProgressLogger));
      } else {
        await dispatch(createProgressAction(values as IProgressLogger));
      }

      closeModal();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <AppTextInput
          id="weight"
          name="weight"
          label="Weight"
          type="number"
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={formik.touched.weight && formik.errors.weight}
        />
        <AppTextInput
          id="chestMeasurement"
          name="chestMeasurement"
          label="Chest"
          type="number"
          value={formik.values.chestMeasurement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.chestMeasurement && Boolean(formik.errors.chestMeasurement)}
          helperText={formik.touched.chestMeasurement && formik.errors.chestMeasurement}
        />
        <AppTextInput
          id="bicepsMeasurement"
          name="bicepsMeasurement"
          label="Biceps"
          type="number"
          value={formik.values.bicepsMeasurement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bicepsMeasurement && Boolean(formik.errors.bicepsMeasurement)}
          helperText={formik.touched.bicepsMeasurement && formik.errors.bicepsMeasurement}
        />
        <AppTextInput
          id="waistMeasurement"
          name="waistMeasurement"
          label="Waist"
          type="number"
          value={formik.values.waistMeasurement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.waistMeasurement && Boolean(formik.errors.waistMeasurement)}
          helperText={formik.touched.waistMeasurement && formik.errors.waistMeasurement}
        />
        <AppTextInput
          id="hipsMeasurement"
          name="hipsMeasurement"
          label="Hips"
          type="number"
          value={formik.values.hipsMeasurement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.hipsMeasurement && Boolean(formik.errors.hipsMeasurement)}
          helperText={formik.touched.hipsMeasurement && formik.errors.hipsMeasurement}
        />
        <AppDateTimeInput
          id="date"
          label="Date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        />
        <AppSubmitButton name={formState ? 'Update Progress' : 'Create Progress'} />
      </form>
    </div>
  );
};

const validationSchema = yup.object({
  weight: yup.number().required('Required field'),
  chestMeasurement: yup.number().required('Required field'),
  bicepsMeasurement: yup.number().required('Required field'),
  hipsMeasurement: yup.number().required('Required field'),
  date: yup.string().required('Required field'),
});

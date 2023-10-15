import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { INutritionLogger } from '../../interfaces';
import { createNutrition, getNutritions } from './nutrition-logger-data-access';

export interface NutritionLoggerState {
  data: INutritionLogger[];
  loading: boolean;
}

const initialState: NutritionLoggerState = {
  data: [],
  loading: false,
};

export const getNutritionsAction = createAsyncThunk('nutritionLogger/getNutritionLoggers', async () => {
  return getNutritions();
});

export const createNutritionAction = createAsyncThunk(
  'nutritionLogger/createNutritionAction',
  async (nutrition: INutritionLogger) => {
    return createNutrition(nutrition);
  },
);

export const nutritionLoggerSlice = createSlice({
  name: 'nutritionLogger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /** Pending */
      .addCase(getNutritionsAction.pending, (state: NutritionLoggerState) => {
        state.loading = true;
      })
      .addCase(createNutritionAction.pending, (state: NutritionLoggerState) => {
        state.loading = true;
      })
      /** Fulfilled */
      .addCase(getNutritionsAction.fulfilled, (state: NutritionLoggerState, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createNutritionAction.fulfilled, (state: NutritionLoggerState, action) => {
        state.loading = false;
        state.data = [action.payload, ...state.data];
        toast.success('Meal was added successfully!');
      })
      /** Rejected */
      .addCase(getNutritionsAction.rejected, (state: NutritionLoggerState) => {
        state.loading = false;
        /**Add message from backend */
        toast.error('Something went wrong');
      })
      .addCase(createNutritionAction.rejected, (state: NutritionLoggerState) => {
        state.loading = false;
        /**Add message from backend */
        toast.error('Something went wrong');
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = nutritionLoggerSlice.actions;

export const nutritionLoggerReducer = nutritionLoggerSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { INutritionLogger } from '../../interfaces';
import { getNutritions } from './nutrition-logger-data-access';

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
      /** Fulfilled */
      .addCase(getNutritionsAction.fulfilled, (state: NutritionLoggerState, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      /** Rejected */
      .addCase(getNutritionsAction.rejected, (state: NutritionLoggerState) => {
        state.loading = false;
        /**Add message from backend */
        toast.error('Something went wrong');
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = nutritionLoggerSlice.actions;

export const nutritionLoggerReducer = nutritionLoggerSlice.reducer;

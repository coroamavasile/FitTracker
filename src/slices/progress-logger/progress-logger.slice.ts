import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { IProgressLogger } from '../../interfaces';
import { createProgress, deleteProgress, getProgress, updateProgress } from './progress-logger-data-access';

export interface ProgressLoggerState {
  data: IProgressLogger[];
  loading: boolean;
}

const initialState: ProgressLoggerState = {
  data: [],
  loading: false,
};

export const getProgressAction = createAsyncThunk('progressLogger/getProgressLoggers', async () => {
  return getProgress();
});

export const createProgressAction = createAsyncThunk(
  'progressLogger/createProgressAction',
  async (payload: IProgressLogger) => {
    return createProgress(payload);
  },
);

export const deleteProgressAction = createAsyncThunk('progressLogger/deleteProgressAction', async (id: number) => {
  return deleteProgress(id);
});

export const updateProgressAction = createAsyncThunk(
  'progressLogger/updateProgressAction',
  async (payload: IProgressLogger) => {
    return updateProgress(payload);
  },
);

export const progressLoggerSlice = createSlice({
  name: 'progressLogger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /** Pending */
      .addCase(getProgressAction.pending, (state: ProgressLoggerState) => {
        state.loading = true;
      })
      .addCase(createProgressAction.pending, (state: ProgressLoggerState) => {
        state.loading = true;
      })
      .addCase(deleteProgressAction.pending, (state: ProgressLoggerState) => {
        state.loading = true;
      })
      .addCase(updateProgressAction.pending, (state: ProgressLoggerState) => {
        state.loading = true;
      })
      /** Fulfilled */
      .addCase(getProgressAction.fulfilled, (state: ProgressLoggerState, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createProgressAction.fulfilled, (state: ProgressLoggerState, action) => {
        state.loading = false;
        state.data = [action.payload, ...state.data];
        toast.success('Progress was added successfully!');
      })
      .addCase(deleteProgressAction.fulfilled, (state: ProgressLoggerState, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.data = state.data.filter((item) => item.id !== deletedId);
        toast.success('Progress was deleted successfully!');
      })
      .addCase(updateProgressAction.fulfilled, (state: ProgressLoggerState, action) => {
        state.loading = false;
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
        toast.success('Progress was updated successfully!');
      })
      /** Rejected */
      .addCase(getProgressAction.rejected, (state: ProgressLoggerState) => {
        state.loading = false;
        toast.error('Could not fetch progress informations.');
      })
      .addCase(createProgressAction.rejected, (state: ProgressLoggerState) => {
        state.loading = false;
        toast.error('Could not create progress.');
      })
      .addCase(deleteProgressAction.rejected, (state: ProgressLoggerState) => {
        state.loading = false;
        toast.error('Could not delete progress.');
      })
      .addCase(updateProgressAction.rejected, (state: ProgressLoggerState) => {
        state.loading = false;
        toast.error('Could not update progress.');
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = progressLoggerSlice.actions;

export const progressLoggerReducer = progressLoggerSlice.reducer;

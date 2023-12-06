import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import { getUserById, updateUser } from './users-data-access';
import { IUser } from '../../interfaces';

export interface UserState {
  loading: boolean;
  currentUser: IUser | undefined;
}

const initialState: UserState = {
  currentUser: undefined,
  loading: false,
};

export const getUserAction = createAsyncThunk('user/getUser', async (userId: number) => {
  return getUserById(userId);
});

export const updateUserAction = createAsyncThunk('user/updateUser', async (user: IUser) => {
  return updateUser(user);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /** Pending */
      .addCase(getUserAction.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(updateUserAction.pending, (state: UserState) => {
        state.loading = true;
      })
      /** Fulfilled */
      .addCase(getUserAction.fulfilled, (state: UserState, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUserAction.fulfilled, (state: UserState, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        toast.success('User updated successfully!');
      })
      /** Rejected */
      .addCase(getUserAction.rejected, (state: UserState) => {
        state.loading = false;
        /**Add message from backend */
        toast.error('Something went wrong');
      })
      .addCase(updateUserAction.rejected, (state: UserState) => {
        state.loading = false;
        /**Add message from backend */
        toast.error('Something went wrong');
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export const usersReducer = userSlice.reducer;

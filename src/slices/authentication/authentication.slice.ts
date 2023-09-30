import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IRegisterRequestDto} from '../../common';
import {register} from './authentication-data-access';
import {toast} from 'react-toastify';

export interface AuthenticationState {
  email: string;
  loading: boolean;
}

const initialState: AuthenticationState = {
  email: '',
  loading: false,
};

export const registerAction = createAsyncThunk(
  'authentication/login',
  async (dto: IRegisterRequestDto) => {
    return register(dto);
  }
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /** Pending */
      .addCase(registerAction.pending, (state: AuthenticationState) => {
        state.loading = true;
      })
      /** Fulfilled */
      .addCase(registerAction.fulfilled, (state: AuthenticationState) => {
        state.loading = false;
        toast('Your account was successfully created!');
        // token?
      })
      /** Rejected */
      .addCase(registerAction.rejected, (state: AuthenticationState) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
